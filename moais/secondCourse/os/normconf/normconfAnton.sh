#!/bin/bash
declare -A units=( ["s"]="s" ["min"]="s" ["h"]="s" ["d"]="s"
  ["mm"]="m" ["sm"]="m" ["dm"]="m" ["m"]="m" ["km"]="m"
  ["mg"]="kg" ["g"]="kg" ["kg"]="kg" ["t"]="kg" )
declare -A units_value=( ["s"]=1 ["min"]=60 ["h"]=3600 ["d"]=86400
  ["mm"]=.001 ["sm"]=.01 ["dm"]=.1 ["m"]=1 ["km"]=1000
  ["mg"]=.000001 ["g"]=.001 ["kg"]=1 ["t"]=1000 )
number_string=
name_parameter=
value_parameter=
normal_value_parameter=
unit_value_parameter=
operator=
result=
handle_unit() {
  if [[ "$value_parameter" != *" "* ]]; then
    check_error_value "$value_parameter"
    get_normal_value "$value_parameter"
    if [[ "$normal_value_parameter" == "."* ]]; then
      result=0"$normal_value_parameter"
    else
      result="$normal_value_parameter"
    fi
  else
    IFS=" "
    read -r -a elements <<< "$value_parameter"
    local length="${#elements[@]}"
    for ((i=0; i < "$length"; i++))
    do
      local cur_element="${elements[i]}"
      if [[ "$cur_element" == "-" || "$cur_element" == "+" ]]; then
        operator="$cur_element"
      else
        check_error_value "$cur_element"
        get_normal_value "$cur_element"
        result=$(bc<<<"scale=10;$result $operator $normal_value_parameter")
        operator="+"
      fi
    done
  fi
  return
}
get_normal_value() {
  regex_for_number="[a-zA-Z]+"
  local length=${#1}
  local unit=
  if [[ ${1:length-2:1} =~ $regex_for_number ]]; then
    unit=${1:length-2:2}
  else
    unit=${1:length-1:1}
  fi
  for unit_el in "${!units_value[@]}"
  do
    if [ "$unit_el" == "$unit" ]; then
      local number=
      if [ ${#unit} -eq 1 ]; then
        number=${1:0:length-1}
      else
        number=${1:0:length-2}
      fi
      normal_value_parameter=$(bc<<<"scale=10;$number * ${units_value[$unit_el]}")
      if [ -z "$unit_value_parameter" ]; then
        unit_value_parameter="${units[$unit]}"
      else
        if [ "$unit_value_parameter" != "${units[$unit]}" ]; then
          error_message "Обнаружены несочетаемые данные!"
        fi
      fi
      return
    fi
  done
  error_message "В моей базе нет такой единицы измерения!"
}
check_error_value() {
  regex_for_number="[^0-9]+"
  regex_for_string="[^a-zA-Z]+"
  local length=${#1}
  if [ "$length" -lt 2 ]; then
    error_message "Значение параметра слишком короткое!"
  elif [[ "$length" -eq 2 || "$length" -eq 3 ]]; then
    if [[ ${1:0:1} =~ $regex_for_number ]]; then
      error_message "Числовое значение параметра в неправильном формате!"
    elif [[ ${1:length-1:1} =~ $regex_for_string ]]; then
      error_message "Единица измерения в неправильном формате!"
    fi
  else
    if [[ ${1:0:length-2} =~ $regex_for_number ]]; then
      error_message "Числовое значение параметра в неправильном формате!"
    elif [[ ${1:length-1:1} =~ $regex_for_string ]]; then
      error_message "Единица измерения в неправильном формате!"
    fi
  fi
}
error_incorrect_data() {
  echo "  Неверный формат данных, отсутствует знак \"=\""
  exit 0
}
error_message() {
  echo "  Ошибка в строке $number_string, параметр $name_parameter"
  echo "  $1"
  exit 0
}
if [[ "$1" = "-h" || "$1" = "--help" ]]; then
  echo "$0 [arg]"
  echo
  echo "    arguments:"
  echo "        -h          справка программы"
  echo "        file        имя конфигурационного файла"
  echo
  echo "    description:"
  echo "        Программа формирует «нормализованный» конфигурационный файл"
  echo
  echo "    examples:"
  echo "        $0 -h             справка программы"
  echo "        $0 config.txt     сформирует «нормализованный» конфигурационный файл"
elif [ -z "$1" ]; then
  echo "Введите аргумент или вызовите справку $0 -h"
else
  normal_file=$(echo "$1" | cut -d "." -f 1)"_normal.txt"
  if [ -f "$normal_file" ]; then rm "$normal_file"; fi
  if [[ "$(cat "$1")" != *"="* ]]; then error_incorrect_data; fi
  IFS=$'\r\n'
  it_name=true
  for str in $(cat "$1")
  do
    result=
    normal_value_parameter=
    unit_value_parameter=
    operator=
    number_string=$(("$number_string" + 1))
    IFS="="
    for part in $str
    do
      if [ $it_name == true ]; then
        name_parameter="$part"
        regex="[^a-zA-Z]+"
        if [[ $part =~ $regex  || -z "$part" ]]; then
          error_message "Название параметра в неправильном формате!"
        fi
        it_name=false
        continue
      fi
      value_parameter="$part"
      handle_unit
      echo "$name_parameter=$result$unit_value_parameter" >> "$normal_file"
      it_name=true
    done
  done
fi
exit 0
