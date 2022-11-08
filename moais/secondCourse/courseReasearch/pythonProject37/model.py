import keras2onnx
import tensorflow
import numpy as np
from keras.datasets import mnist
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.utils import np_utils
import image

np.random.seed(1337)  # for reproducibility

nb_classes = 10
# размер изображения
img_rows, img_cols = 28, 28

# данные были перемешаны и разделены на обучающий и проверочный наборы
(X_train, y_train), (X_test, y_test) = mnist\
    .load_data("C:\\Users\\Gizon\\Desktop\\Study\\moais\\secondCourse\\courseReasearch\\pythonProject37\\mnist.pkl")

# изменяем размер массива  (кол-во примеров, w,h, кол-во каналов изображения)
X_train = X_train.reshape(X_train.shape[0], img_rows, img_cols, 1)
X_test = X_test.reshape(X_test.shape[0], img_rows, img_cols, 1)

X_train = X_train.astype('float32')
X_test = X_test.astype('float32')

# переводим значения в диапазон от 0 до 1
X_train /= 255
X_test /= 255

first=X_test[0:1]

print("====================================================")
print(first)
print("====================================================")

print('X_train shape:', X_train.shape)
print(X_train.shape[0], 'train samples')
print(X_test.shape[0], 'test samples')

# преобразование вектора разметки в матрицу кол-во примеров*кол-во классов
Y_train = np_utils.to_categorical(y_train, nb_classes)
Y_test = np_utils.to_categorical(y_test, nb_classes)

model = Sequential()
#32 фильтра размером (3,3),
#padding='valid' - не добавляем 0 на границе изображения,
#после свертки получим меньшую размерность 26*26
#padding='same' - добавляем 0, после свертки размерность будет 28x28
model.add(Conv2D(32, (3, 3), padding='valid', input_shape=(28, 28, 1)))
#params: 32*(3x3+1) = 320, output: (28-1-1)x(28-1-1) x 32 = 26x26 x 32
model.add(Activation('relu'))

model.add(Conv2D(32, (3, 3), activation ='relu'))
#params: 32*(32*3*3+1) = 9248, output (26-2)x(26-2) x 32 = 24x24 x 32
#model.add(Activation('relu'))

model.add(MaxPooling2D(pool_size=(2, 2)))
#output: 12x12 x 32

model.add(Dropout(0.25))

model.add(Flatten())
#input: 12x12 x 32, output: 12x12x32=4608

model.add(Dense(128))
#params: (4608+1)*128=589952, output: 128
model.add(Activation('relu'))

model.add(Dropout(0.5))
model.add(Dense(nb_classes))
#params: (128+1)*10=1290

model.add(Activation('softmax'))

#Print model info
#https://keras.io/models/about-keras-models/
model.summary()

#Total params: 600810

# adadelta is one of optimizer
model.compile(optimizer='adadelta',loss='categorical_crossentropy',metrics=['accuracy'])
#model.load_weights("C:\\Users\\Gizon\\PycharmProjects\\pythonProject\\course\\cnn.h5")

# batch_size, epochs
model.fit(X_train, Y_train, batch_size=128, epochs=1, #5,12
verbose=1, validation_data=(X_test, Y_test))

# try zone
#first_ten_X= X_test[0:27]

#print("===========================================================================================")
#print(X_test)
#print("===========================================================================================")
#first_ten_Y= Y_test[0:27]
#print(first_ten_Y)

score = model.evaluate(X_test, Y_test,verbose=0)

print("====================================================")
print(model.predict(first, 128, 1))


def get_image_from_memory(modelDir="", testImage=""):
    from keras.preprocessing.image import img_to_array, load_img
    # чтение изображения в массив
    image = load_img(modelDir + testImage, color_mode="grayscale")
    image = img_to_array(image)
    image /= 255
    image = image.reshape(1, img_rows, img_cols, 1)
    image = image.astype('float32')
    return image


print("====================================================")
image1 = get_image_from_memory("C:\\Users\\Gizon\\Desktop\\Study\\moais\\secondCourse\\courseReasearch\\","1.jpg")
print(model.predict(image1))
print("====================================================")
#print(model.predict(first_ten_Y, 128, 1))
# try zone


#img=Image.open(path).convert("L")
#img.shape
#print(model.predict(np.array(img)))
# generate png 32x32 with a number

# text: task, what wanted to do, why needed (c# for back, py for ml) -- intro
# what onnx is, how correlates to py, description with code examples maybe
# 1, 2, 3 description
print('Test accuracy:', score[1])

#Сохранение обученной модели на диск
model.save("cnn.h5")


#a=load_model("cnn.h5")
#score = a.evaluate(X_test, Y_test,verbose=0)
#print('Test accuracy:', score[1])
