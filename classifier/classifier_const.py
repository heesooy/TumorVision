import classifier_util
from random import shuffle

K_MODEL_PATH = "../classifier/models/"
K_DATA_PATH = "../../../LesionTrainingData/"

K_IMAGE_PATH = K_DATA_PATH+"Images/"
#Set 1 ranges from 0024306 to 0029999
#Set 2 ranges from 0030000 to 0034320
#Images are 600x450

K_IMAGE_SIZE = 600*450*4+3 #600x450 array of R,G,B, is Edge (3 colors + 1 option), +3 for sex, age, and location
K_IMAGE_ID_LOWER = 24306
K_IMAGE_ID_UPPER = 34321
K_BATCH_SIZE = 12

K_IMAGE_ORDER = range(K_IMAGE_ID_LOWER, K_IMAGE_ID_UPPER)
shuffle(K_IMAGE_ORDER)

K_DIS_DICT = {'akiec': 0, 'bcc': 1, 'bkl': 2, 'df': 3, 'mel': 4, 'nv': 5, 'vasc': 6}
K_SEX_DICT = {'male': 0, 'female': 1, 'unknown': 2}
K_LOC_DICT = {'back': 0, 'lower extremity': 1, 'scalp': 2, 'ear': 3, 'face': 4, 'trunk': 5,\
									'chest': 6, 'upper extremity': 7, 'abdomen': 8, 'hand': 9, 'genital': 10,\
									'neck': 11, 'foot': 12, 'unknown': 13, 'acral': 14}

K_DIS_LOOKUP = {v: k for k, v in K_DIS_DICT.iteritems()}
K_SEX_LOOKUP = {v: k for k, v in K_SEX_DICT.iteritems()}
K_LOC_LOOKUP = {v: k for k, v in K_LOC_DICT.iteritems()}
