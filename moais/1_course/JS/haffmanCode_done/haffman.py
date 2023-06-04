# Закодируйте любую строку по алгоритму Хаффмана.
from collections import Counter


class Node:
    def __init__(self, value, left=None, right=None):
        self.right = right
        self.left = left
        self.value = value


def get_code(leaf, codes=None, code=''):
    if codes is None:
        codes = dict()
    if leaf is None:
        return
    if isinstance(leaf.value, str):
        codes[leaf.value] = code
        return codes
    get_code(leaf.left, codes, code + '0')
    get_code(leaf.right, codes, code + '1')

    return codes


def get_tree(string):
    string_count = Counter(string)
    if len(string_count) <= 1:
        node = Node(None)
        if len(string_count) == 1:
            node.left = Node([key for key in string_count][0])
            node.right = Node(None)
        string_count = {node: 1}

    while len(string_count) != 1:
        node = Node(None)
        spam = string_count.most_common()[:-3:-1]
        if isinstance(spam[0][0], str):
            node.left = Node(spam[0][0])
        else:
            node.left = spam[0][0]
        if isinstance(spam[1][0], str):
            node.right = Node(spam[1][0])
        else:
            node.right = spam[1][0]
        del string_count[spam[0][0]]
        del string_count[spam[1][0]]
        string_count[node] = spam[0][1] + spam[1][1]

    return [key for key in string_count][0]


def coding(string, codes):
    res = ''
    for symbol in string:
        res += codes[symbol]

    return res


def decoding(string, codes):
    res = ''
    i = 0
    while i < len(string):
        for code in codes:
            if string[i:].find(codes[code]) == 0:
                res += code
                i += len(codes[code])

    return res


def main(user_input):
    tree = get_tree(user_input)
    codes = get_code(tree)
    print(f'Шифр: {codes}')
    coding_str = coding(user_input, codes)
    print('Сжатая строка: ', coding_str)
    decoding_str = decoding(coding_str, codes)
    print('Исходная строка: ', decoding_str)
    if user_input == decoding_str:
        print('Успешно!')
    else:
        print('Ошибка!')


while True:
    my_string = input('Введите строку для сжатия: ')
    if my_string == " ":
        break
    main(my_string)
