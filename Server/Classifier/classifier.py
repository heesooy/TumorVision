import numpy as np
import cv2
import classifier_lib
import classifier_const
from sklearn.linear_model import SGDClassifier
from sklearn.externals import joblib

#Train a model off the first train_split fraction of the data, stores it in classifier_name
def train_model(train_split, classifier_name, lookup_table):

	#Use Stochastic Gradient Descent
	classifier = SGDClassifier(loss='log', max_iter=10**9)

	data_size = classifier_const.K_IMAGE_ID_UPPER-classifier_const.K_IMAGE_ID_LOWER

	batches = (int)(data_size*train_split)//classifier_const.K_BATCH_SIZE

	#Our unit of training size is batch
	for batch in range(batches):

		print "Training Batch:",batch+1,"of",batches

		image_data_array = []
		disease_array = []

		for rand_id in range(batch*classifier_const.K_BATCH_SIZE, (batch+1)*classifier_const.K_BATCH_SIZE):

			image_id = classifier_const.K_IMAGE_ORDER[rand_id]

			image = classifier_lib.load_image_jpg(classifier_const.K_IMAGE_PATH, image_id, lookup_table,\
												  classifier_const.K_SEX_DICT, classifier_const.K_LOC_DICT)
			disease = classifier_lib.lookup_image_disease(classifier_const.K_IMAGE_PATH, image_id,\
														  lookup_table, classifier_const.K_DIS_DICT)

			#print "\t",image,"->",disease

			image_data_array.append(image)
			disease_array.append(disease)

		image_data_set = np.array(image_data_array)
		disease_set = np.array(disease_array)

		classifier.partial_fit(image_data_set, disease_set, classes=np.unique(range(len(classifier_const.K_DIS_DICT))))

	#Store the trained model
	joblib.dump(classifier, classifier_const.K_MODEL_PATH+classifier_name+".joblib")

#Test the accuracy of a given model using the last test_split fraction of the data, and prints out the results
def test_model(model, test_split, lookup_table):

	correct_evaluated = []
	total_evaluated = []
	for disease_id in range(len(classifier_const.K_DIS_DICT)):
		correct_evaluated.append(0)
		total_evaluated.append(0)

	data_size = classifier_const.K_IMAGE_ID_UPPER-classifier_const.K_IMAGE_ID_LOWER

	lower = (int)(data_size*(1-test_split))

	for rand_id in range(lower, data_size):

		image_id = classifier_const.K_IMAGE_ORDER[rand_id]

		image = classifier_lib.load_image_jpg(classifier_const.K_IMAGE_PATH, image_id, lookup_table,\
												  classifier_const.K_SEX_DICT, classifier_const.K_LOC_DICT)
		predicted_disease = model.predict([image])
		actual_disease = classifier_lib.lookup_image_disease(classifier_const.K_IMAGE_PATH, image_id,\
														  lookup_table, classifier_const.K_DIS_DICT)

		total_evaluated[actual_disease] += 1

		if(predicted_disease[0] == actual_disease):
			correct_evaluated[actual_disease] += 1

	print "------------- Test Results --------------"

	correct_count = 0
	total_count = 0

	for disease_id in range(len(classifier_const.K_DIS_DICT)):

		correct_count += correct_evaluated[disease_id]
		total_count += total_evaluated[disease_id]

		if total_evaluated[disease_id] != 0:
			print "Disease type "+classifier_const.K_DIS_LOOKUP[disease_id]+" classification rate: "+\
			   	   str((int)(float(correct_evaluated[disease_id])/total_evaluated[disease_id]*100))+"%"
			print correct_evaluated[disease_id]
			print total_evaluated[disease_id]

	print "Total disease classification rate: " + str((int)(float(correct_count)/total_count*100))+"%"

	print "----------- End Test Results ------------"

#Load a model file and return an instantiated classifier
def load_model(model_name):
	
	print "Loading model "+model_name
	
	classifier = joblib.load(classifier_const.K_MODEL_PATH+model_name+'.joblib')
	
	print "Successfully loaded model "+model_name
	
	return classifier

#Identify features of a cv2 image, and append those with the user sex, age, and location
def create_img_array(image_array, user_sex=2, user_age=0, user_location=12):

    edges = cv2.Canny(image_array, 100, 200)

    image_arr = np.append(np.array(image_array), np.array(edges))
    image_arr = image_arr.flatten()

    image_arr = np.append(image_arr, [user_sex, user_location, user_age])

    return image_arr

#Use given model to predict the class type of image
def classify_image(model, image):

	return model.predict([image])[0]