Created by Joe Carolan, Dev Satpathy, Danielle Yang, and Heesoo Yang for Boilermake VI
# TumorVision

An application for Android, iOS, and web environments to diagnose a lesion on a patient's skin, built using Python, Flask, and React Native.

The application visually analyzes skin lesions from pictures to determine whether the lesions correspond to any known types of cancer or other significant dermataological conditions. When the application is executed, the client takes an image of a lesion on their skin using their smartphone, providing data about their age, gender, and the region of the body where the picture is taken. This is then sent to a server where it is compared with a ML model to diagnose the type of lesion on the skin, and to determine if it is cancerous. Afterwards, the client is sent back data about the potential characteristics of their disease. The ML model is trained using a data set acquired from kaggle.com: 
https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000
Limitations of the model include the size of the data set, probabilities computed by the ML model of the data, and only taking one image to evaluate a skin lesion.

# Skin Cancer Types and Info

 Actinic keratoses and intraepithelial carcinoma / Bowen's disease (akiec): 
 Cancerous, treatable
 Bowen's disease, also known as squamous cell carcinoma in situ is a neoplastic skin disease. It can be considered as an early
 stage or intraepidermal form of squamous cell carcinoma.
 https://en.wikipedia.org/wiki/Bowen%27s_disease
 
 basal cell carcinoma (bcc):
 Cancerous, treatable
 A type of skin cancer that begins in the basal cells.
 https://www.mayoclinic.org/diseases-conditions/basal-cell-carcinoma/symptoms-causes/syc-20354187
 
 benign keratosis-like lesions (solar lentigines / seborrheic keratoses and lichen-planus like keratoses, bkl):
 Non-cancerous
 Seborrheic keratosis is one of the most common noncancerous skin growths in older adults.
 Seborrheic keratoses are normally painless and require no treatment. You may decide to have them removed if they become irritated by clothing or for cosmetic reasons.
 https://www.mayoclinic.org/diseases-conditions/seborrheic-keratosis/symptoms-causes/syc-20353878
 
 dermatofibroma (df):
 Cancerous, treatable, grows slowly
 Dermatofibroma is a very rare type of skin cancer that begins in connective tissue cells in the middle layer of your skin (dermis).
 It grows slowly and rarely spreads beyond the skin.
 https://www.mayoclinic.org/diseases-conditions/dermatofibrosarcoma-protuberans/cdc-20352949
 
 melanoma (mel):
 Cancerous, treatable if detected early
 Melanoma is the most serious type of skin cancer. Knowing the warning signs of skin cancer can help ensure that cancerous changes are detected
 and treated before the cancer has spread. Melanoma can be treated successfully if it is detected early.
 https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884
 
 melanocytic nevi (nv):
 Non-cancerous
 A usually noncancerous disorder of pigment-producing skin cells commonly called birth marks or moles. They can exist at birth or appear later. Rarely, melanocytic nevi can become cancerous.
 Most cases don't require treatment, but some cases require removal of the mole.
 https://www.mayoclinic.org/diseases-conditions/moles/symptoms-causes/syc-20375200
 
 vascular lesions (angiomas, angiokeratomas, pyogenic granulomas and hemorrhage, vasc):
 Non-cancerous
 Pyogenic granulomas are skin growths that are small, round, and usually bloody red in color. Doctors can remove them through a variety of methods.
 https://www.healthline.com/health/pyogenic-granuloma
 
