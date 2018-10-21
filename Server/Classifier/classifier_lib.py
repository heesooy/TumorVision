import numpy as np
import cv2

#Returns a dictionary map of image to classification info
def load_metadata(data_dir):

    loaded_metadata = {}

    with open(data_dir+"HAM10000_metadata.csv", 'r') as load_file:
        for new_line in load_file:

            chunked_data = new_line.split(",") #Split into data entries
            chunked_data[-1] = chunked_data[-1][:-1] #Remove /n from the last data entry

            key = chunked_data[1]
            value = chunked_data[2:]

            loaded_metadata[key] = value

    return loaded_metadata

#Fetches given image and returns all info about it in flat array
def load_image_jpg(data_dir, image_id, lookup_table, sex_dict, loc_dict):
    
    loaded_image = cv2.imread(data_dir+'ISIC_00'+str(image_id)+'.jpg')
    edges = cv2.Canny(loaded_image, 100, 200)
    
    arr = np.append(np.array(loaded_image), np.array(edges))
    arr = arr.flatten()

    image_data = lookup_table['ISIC_00'+str(image_id)]
    sex = sex_dict[image_data[3]]
    loc = loc_dict[image_data[4]]
    age = 0
    if image_data[2] != '' and image_data[2] != ' ':
        age = int(float(image_data[2]))

    arr = np.append(arr, [sex, loc, age])

    return arr

#Look up the disease classification of a given image
def lookup_image_disease(data_dir, image_id, lookup_table, disease_dict):
    
    image_data = lookup_table['ISIC_00'+str(image_id)]

    disease = disease_dict[image_data[0]]
    return disease