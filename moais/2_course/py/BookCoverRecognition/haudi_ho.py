import numpy as np


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


# Выдать должно первый элемент массива
training_input = np.array([[0, 0, 1],
                           [1, 1, 1],
                           [1, 0, 1],
                           [0, 1, 1]])

training_output = np.array([[0, 1, 1, 0]]).T

synaptic_weights = 2 * np.random.random((3, 1)) - 1

print(f"Начальные веса:\n{synaptic_weights}")

# Метод обратного распространения
for i in range(20000):
    input_layer = training_input
    output = sigmoid(np.dot(input_layer, synaptic_weights))

    err = training_output - output
    adjustment = np.dot(input_layer.T, err * (output * (1 - output)))

    synaptic_weights += adjustment

print(f"Результат:\n{output}")

# Test
new_input = np.array([1, 1, 0])
output = sigmoid(np.dot(new_input, synaptic_weights))
print(f"Test:\n{output}")
