#!/bin/bash

handleBar()
{
	tdw=([0]=s [1]=min [2]=h [3]=d [4]=mm [5]=sm [6]=dm [7]=m [8]=km [9]=mg [10]=g [11]=kg [12]=t)
	multiplier=([0]=1 [1]=60 [2]=3600 [3]=86400 [4]=0.001 [5]=0.01 [6]=0.1 [7]=1 [8]=1000 [9]=0.000001 [10]=0.001 [11]=1 [12]=1000)
	
	variableWithOpExp="^[A-Za-z]+[=]{1}([0-9]+${tdw[10]}{1}[-]+\1)+[^.]$"
	
	
	timeExp="(${tdw[0]}|${tdw[1]}|${tdw[2]}|${tdw[3]})"
	distanceExp="(${tdw[4]}|${tdw[5]}|${tdw[6]}|${tdw[7]}|${tdw[8]})"
	weightExp="(${tdw[9]}|${tdw[10]}|${tdw[11]}|${tdw[12]})"
	tdwExp="($timeExp|$distanceExp|$weightExp)"
	
	#echo $bar | grep -oP "[0-9]+$weightExp((\-|\+|\s)[0-9]+$weightExp)+[^.]$"
	
	
	for ((i=0; i<13; i++))
	do
		variableExp="^[A-Za-z]+[=]{1}"
		valueExp="[0-9]+${tdw[$i]}{1}[^.]$"
		index=$i
		
		#\s
		operationExp="[0-9]+$tdwExp((\-|\+| +|	+){1}[0-9]+$tdwExp)+[^.]$"
		operationTimeExp="[0-9]+$timeExp((\-|\+| +|	+){1}[0-9]+$timeExp)+[^.]$"
		operationDistanceExp="[0-9]+$distanceExp((\-|\+| +|	+){1}[0-9]+$distanceExp)+[^.]$"
		operationWeightExp="[0-9]+$weightExp((\-|\+| +|	+){1}[0-9]+$weightExp)+[^.]$"
		
		if [[ $bar =~ $variableExp$operationExp ]]; then

			if [[ $bar =~ $operationTimeExp ]] || [[ $bar =~ $operationDistanceExp ]] || [[ $bar =~ $operationWeightExp ]]; then
				nameOfVariable=$(echo $bar | grep -oP "^[A-Za-z]+[=]{1}")
				local result=$nameOfVariable$(handleOperation $bar $tdw $multiplier $resultFileName $tdwExp $nameOfVariable)
				echo $result >> $resultFileName
				return 0
			else
				echo "Несочетаемые единицы измерения!"
				return 1
			fi
		fi
		
		if [[ $bar =~ $variableExp$valueExp ]] && ! [[ $bar =~ $operationExp ]]; then
				measureUnit=$(echo $bar | grep -oP "[0-9]+")
				nameOfVariable=$(echo $bar | grep -oP "^[A-Za-z]+[=]{1}")
				
				local result=$nameOfVariable$(hadnleMeasureUnit $measureUnit $tdw $multiplier $index $resultFileName)
				echo $result >> $resultFileName
				return 0
		fi
			
	done
	echo $bar >> $resultFileName
	return 1
}


handleOperation ()
{
	measureUnit=$(echo $bar | grep -oP "[0-9]+")
	measureUnitLetter=$(echo $bar | grep -oP "[0-9]+($tdwExp)+" | grep -oP "($tdwExp)+")
	#echo $measureUnit; echo $measureUnitLetter
	
	bar=$(echo $bar | sed "s/ /+/g" | sed "s/	/+/g")
	
	operations=$(echo $bar | grep -oP "(\+|\-){1}")
	#echo $operations
	
	k=0
	measureUnitLetter=$(echo $measureUnitLetter | sed "s/ /,/g")
	
	IFS=',' read -ra mulArray <<< "$measureUnitLetter"
		for i in "${mulArray[@]}"; do
		value="$i"
		getMeasureUnitIndex $value
		local indexArr[$k]=$?
		(( k++ ))
	done
	
	
	k=0
	operations=$(echo $operations | sed "s/ /,/g")
	IFS=',' read -ra opArray <<< "$operations"
	for i in "${opArray[@]}"; do
		#echo ${opArray[$k]}
		(( k++ ))
	done
	
	k=0
	measureUnit=$(echo $measureUnit | sed "s/ /,/g")
	IFS=',' read -ra muArray <<< "$measureUnit"
	for i in "${muArray[@]}"; do
		measureUnit=${muArray[$k]}
		index=${indexArr[$k]}
		local newMUArr[$k]=$(hadnleMeasureUnit $measureUnit $tdw $multiplier $index $resultFileName)
		#echo ${newMUArr[$k]}
		(( k++ ))
	done
	
	k=0
	resultSum=$(echo ${newMUArr[0]} | grep -oP "([0-9]+\.[0-9]+)|([0-9]+)")
	resultMU=$(echo ${newMUArr[0]} | grep -oP "($tdwExp)+")
	#echo $resultSum
	for ((i=0; i<${#opArray[@]}; i++))
	do
		mu=$(echo ${newMUArr[$(( i+1 ))]} | grep -oP "([0-9]+\.[0-9]+)|([0-9]+)")
		if [[ "${opArray[(($i))]}" == "+" ]]; then
			resultSum=$(echo "$resultSum+$mu" | bc | sed 's/^\./0./' | sed 's/^\-\./-0./')
		else
			resultSum=$(echo "$resultSum-$mu" | bc | sed 's/^\./0./' | sed 's/^\-\./-0./')
		fi
		#echo $resultSum
	done
	
	echo $resultSum$resultMU
}

getMeasureUnitIndex()
{
	for i in "${!tdw[@]}"; do
		if [[ "${tdw[$i]}" = "${value}" ]]; then
			return "${i}";
		fi
	done
}


hadnleMeasureUnit ()
{ 
	newMeasureUnit=0
	
	if (($index<4)); then
		newMeasureUnit=$(echo "${multiplier[$index]}*$measureUnit" | bc | sed 's/^\./0./')
		result=${newMeasureUnit}${tdw[0]}
	fi
	
	if (($index>3)) && (($index<9)); then
		newMeasureUnit=$(echo "${multiplier[$index]}*$measureUnit" | bc | sed 's/^\./0./')
		result=${newMeasureUnit}${tdw[7]}
	fi
	
	if (($index>8)); then
		newMeasureUnit=$(echo "${multiplier[$index]}*$measureUnit" | bc | sed 's/^\./0./')
		result=${newMeasureUnit}${tdw[11]}
	fi
	
	echo $result
}

if [ $# -eq 0 ]; then
	echo "Не передано никаких аргументов! Используйте следующую команду для получения справки о работе скрипта - ./normconf.sh -h"
	exit 1
fi

if [[ "$1" == "-h" ]]; then
	while f= read -r line; do echo $line; done < help.txt
	exit 1
fi

if ! [[ -f $1 ]]; then
	echo "В данной директории не существует такого файла!"
	exit 1
fi



fileName=$1
resultFileName="${fileName%.*}_normal.txt"
#echo $resultFileName

> $resultFileName

barNumber=1
cat $1 | while read bar
do
	handleBar $bar $resultFileName
	if ! (($?==0)); then 
		echo "Неверный формат записи данных в ${barNumber} строке! Для получения справки о формате конфигурационного файла выполните: ./normconf.sh -h"
		echo
	fi
	barNumber=$((barNumber+1))
done
echo "Результат записан в ${resultFileName}"

