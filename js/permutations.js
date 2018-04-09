
var encryptFlag = true;

var printObject = {
	text:[],
	key:[],
	afterP10Key:[],
	afterFirstSplitLeft:[],
	afterFirstSplitRight:[],
	afterLeftLS1:[],
	afterRightLS1:[],
	subKeyK1:[],
	afterLeftLS2:[],
	afterRightLS2:[],
	subKeyK2:[],
	afterIP:[],
	afterIPSplitLeft:[],
	afterIPSplitRight:[],
	afterEPRound1:[],
	afterXORK1:[],
	afterXORK1SplitLeft:[],
	afterXORK1SplitRight:[],
	afterS0Round1:[],
	afterS1Round1:[],
	afterP4Round1:[],
	afterFinalXORRound1:[],
	resultOfRoundFunctionFK1:[],
	afterSwitch:[],
	afterSwitchSplitLeft:[],
	afterSwitchSplitRight:[],
	afterEPRound2:[],
	afterXORK2:[],
	afterXORK2SplitLeft:[],
	afterXORK2SplitRight:[],
	afterS0Round2:[],
	afterS1Round2:[],
	afterP4Round2:[],
	afterFinalXORRound2:[],
	resultOfRoundFunctionFK2:[],
	finalResult:[]
};





function p10(inputKey)
{
	var outputKey = [];
	var permutation = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
	var i = 0;
	var keyLength = 10;

	if (inputKey.length != keyLength)
	{
		return -1;
	}

	for (i = 0; i < keyLength; i++)
	{
		outputKey.push(inputKey[permutation[i] - 1]);
	}

	return outputKey;
}

function p8(inputKey)
{
	var outputKey = [];
	var permutation = [6, 3, 7, 4, 8, 5, 10, 9];
	var i = 0;
	var inputKeyLength = 10;
	var outputKeyLength = 8;

	if (inputKey.length != inputKeyLength)
	{
		return -1;
	}

	for (i = 0; i < outputKeyLength; i++)
	{
		outputKey.push(inputKey[permutation[i] - 1]);
	}

	return outputKey;
}

function splitString(inputString)
{
	var leftString = [];
	var rightString = [];
	var stringLength = inputString.length;
	var midPoint;

	if((stringLength % 2) == 1)
	{
		return -1;
	}

	midPoint = stringLength / 2;
	leftString = inputString.slice(0, midPoint);
	rightString = inputString.slice(midPoint, stringLength);

	return {
		leftString:leftString,
		rightString:rightString
	};
}

function leftShift(inputKey, shiftLength)
{
	var outputKey = [];
	var i = 0;
	var keyLength = inputKey.length;

	if (keyLength < 1)
	{
		return -1;
	}

	for (i = 0; i < keyLength; i++)
	{
		outputKey.push(inputKey[((i + shiftLength) % keyLength)]);
	}

	return outputKey;
}














function ip(inputString)
{
	var outputString = [];
	var permutation = [2, 6, 3, 1, 4, 8, 5, 7];
	var i = 0;
	var stringLength = 8;

	if (inputString.length != stringLength)
	{
		return -1;
	}

	for (i = 0; i < stringLength; i++)
	{
		outputString.push(inputString[permutation[i] - 1]);
	}

	return outputString;
}

function ipInverse(inputString)
{
	var outputString = [];
	var permutation = [4, 1, 3, 5, 7, 2, 8, 6];
	var i = 0;
	var stringLength = 8;

	if (inputString.length != stringLength)
	{
		return -1;
	}

	for (i = 0; i < stringLength; i++)
	{
		outputString.push(inputString[permutation[i] - 1]);
	}

	return outputString;
}

function ep(inputString)
{
	var outputString = [];
	var permutation = [4, 1, 2, 3, 2, 3, 4, 1];
	var i = 0;
	var inputStringLength = 4;
	var outputStringLength = 8;	

	if (inputString.length != inputStringLength)
	{
		return -1;
	}

	for (i = 0; i < outputStringLength; i++)
	{
		outputString.push(inputString[permutation[i] - 1]);
	}

	return outputString;
}

function p4(inputString)
{
	var outputString = [];
	var permutation = [2, 4, 3, 1];
	var i = 0;
	var stringLength = 4;

	if (inputString.length != stringLength)
	{
		return -1;
	}

	for (i = 0; i < stringLength; i++)
	{
		outputString.push(inputString[permutation[i] - 1]);
	}

	return outputString;
}

function xor(inputString, key)
{
	var outputString = [];
	var i = 0;
	var stringLength = inputString.length;

	if (stringLength < 1 || stringLength != key.length)
	{
		return -1;
	}

	for (i = 0; i < stringLength; i++)
	{
		outputString.push(inputString[i] ^ key[i]);
	}

	return outputString;
}

function sbox(inputString, sboxIndex)
{
	var sboxDefinition = [
						[
						[[[0],[1]], [[0],[0]], [[1],[1]], [[1],[0]]],
						[[[1],[1]], [[1],[0]], [[0],[1]], [[0],[0]]],
						[[[0],[0]], [[1],[0]], [[0],[1]], [[1],[1]]],
						[[[1],[1]], [[0],[1]], [[1],[1]], [[1],[0]]]
						],

						[
						[[[0],[0]], [[0],[1]], [[1],[0]], [[1],[1]]],
						[[[1],[0]], [[0],[0]], [[0],[1]], [[1],[1]]],
						[[[1],[1]], [[0],[0]], [[0],[1]], [[0],[0]]],
						[[[1],[0]], [[0],[1]], [[0],[0]], [[1],[1]]]
						]

						];

	var outputString = [];
	var row;
	var col;

	if (inputString.length != 4)
	{
		return -1;
	}

	row = (inputString[0] << 1) + inputString[3];
	col = (inputString[1] << 1) + inputString[2];

	outputString = sboxDefinition[sboxIndex][row][col];

	return outputString;
}

function switchFunction(leftString, rightString)
{
	return {
		leftString:rightString,
		rightString:leftString
	};
}














function sdesKeyGenerator(inputKey)
{
	var inputKeyLength = 10;
	var afterP10Key;
	var leftKey;
	var rightKey;
	var splitKeyContainer;
	var outputKey1;
	var outputKey2;

	if (inputKey.length != inputKeyLength)
	{
		return -1;
	}

	afterP10Key = p10(inputKey);

	//Store the afterP10Key to print to the screen later
	printObject.afterP10Key = afterP10Key;

	splitKeyContainer = splitString(afterP10Key);
  	leftKey = splitKeyContainer.leftString;
  	rightKey = splitKeyContainer.rightString;

  	//Store the left & right to print to the screen later
	printObject.afterFirstSplitLeft = leftKey;
	printObject.afterFirstSplitRight = rightKey;


  	leftKey = leftShift(leftKey, 1);
  	rightKey = leftShift(rightKey, 1);

  	//Store the left & right to print to the screen later
	printObject.afterLeftLS1 = leftKey;
	printObject.afterRightLS1 = rightKey;

  	outputKey1 = p8(leftKey.concat(rightKey));

  	//Store subkey K1 to print to the screen later
	printObject.subKeyK1 = outputKey1;


  	leftKey = leftShift(leftKey, 2);
  	rightKey = leftShift(rightKey, 2);

  	//Store the left & right to print to the screen later
	printObject.afterLeftLS2 = leftKey;
	printObject.afterRightLS2 = rightKey;

  	outputKey2 = p8(leftKey.concat(rightKey));

  	//Store subkey K2 to print to the screen later
	printObject.subKeyK2 = outputKey2;

  	return {
		k1:outputKey1,
		k2:outputKey2
	};
}










function mappingFunction(inputString, key, currentRoundNumber)
{
	var inputStringLength = inputString.length;
	var keyLength = key.length;
	var outputString;
	var postEPString;
	var leftString;
	var rightString;
	var sboxLeft;
	var sboxRight;
	var tempString;
	var tempObject;
	var i = 0;

	postEPString = ep(inputString);

	//Store the afterEP to print to the screen later
	if(currentRoundNumber == 1)
		printObject.afterEPRound1 = postEPString.slice();
	else
		printObject.afterEPRound2 = postEPString.slice();

	for (i = 0; i < keyLength; i++)
	{
		postEPString[i] = postEPString[i] ^ key[i];
	}

	//Store the afterXORK to print to the screen later
	if(currentRoundNumber == 1)
		printObject.afterXORK1 = postEPString.slice();
	else
		printObject.afterXORK2 = postEPString.slice();

	tempObject = splitString(postEPString);

	leftString = tempObject.leftString;
	rightString = tempObject.rightString;

	//Store the afterXORK1Split to print to the screen later
	if(currentRoundNumber == 1)
	{
		printObject.afterXORK1SplitLeft = leftString.slice();
		printObject.afterXORK1SplitRight = rightString.slice();
	}
	else
	{
		printObject.afterXORK2SplitLeft = leftString.slice();
		printObject.afterXORK2SplitRight = rightString.slice();
	}
	

	sboxLeft = sbox(leftString, 0);
	sboxRight = sbox(rightString, 1);

	//Store the sbox results to print to the screen later
	if(currentRoundNumber == 1)
	{
		printObject.afterS0Round1 = sboxLeft.slice();
		printObject.afterS1Round1 = sboxRight.slice();
	}
	else
	{
		printObject.afterS0Round2 = sboxLeft.slice();
		printObject.afterS1Round2 = sboxRight.slice();
	}

	tempString = sboxLeft.concat(sboxRight);

	outputString = p4(tempString);

	//Store the p4 results to print to the screen later
	if(currentRoundNumber == 1)
	{
		printObject.afterP4Round1 = outputString.slice();
	}
	else
	{
		printObject.afterP4Round2 = outputString.slice();
	}
	

	return outputString;
}

function roundFunction(leftString, rightString, key, currentRoundNumber)
{
	var keyLength = 4;
	var mappingFunctionResult;



	mappingFunctionResult = mappingFunction(rightString, key, currentRoundNumber);

	for (i = 0; i < keyLength; i++)
	{
		leftString[i] = leftString[i] ^ mappingFunctionResult[i];
	}

	//Store the afterFinalXORRound1 to print to the screen later
	if(currentRoundNumber == 1)
	{
		printObject.afterFinalXORRound1 = leftString.slice();
	}
	else
	{
		printObject.afterFinalXORRound2 = leftString.slice();
	}
	

	return {
		leftString:leftString,
		rightString:rightString
	};
}

function sdes(inputText, key)
{
	var leftText;
	var rightText;
	var roundKeys = [];
	var objectHolder;
	var outputText;
	var postIPText;
	var i;

	objectHolder = sdesKeyGenerator(key);
	roundKeys.push(objectHolder.k1);
	roundKeys.push(objectHolder.k2);


	if (encryptFlag)
	{
		postIPText = ip(inputText);

		//Store the afterIP to print to the screen later
		printObject.afterIP = postIPText;

		rightText = postIPText.slice(4, 8);
		leftText = postIPText.slice();
		leftText.splice(4, 4);
	}
	else
	{
		postIPText = ip(inputText);

		//Store the afterIP to print to the screen later
		printObject.afterIP = postIPText;

		rightText = postIPText.slice(4, 8);
		leftText = postIPText.slice();
		leftText.splice(4, 4);
	}

	//Store the left & right half of IP to print to the screen later
	printObject.afterIPSplitLeft = leftText.slice();
	printObject.afterIPSplitRight = rightText.slice();

	//Perform the round function twice, and the switch function in between
	for (i = 0; i < 2; i++)
	{
		if (encryptFlag)
		{
			objectHolder = roundFunction(leftText, rightText, roundKeys[i], i + 1);
		}
		else
		{
			objectHolder = roundFunction(leftText, rightText, roundKeys[1 - i], i + 1);
		}

		if (i == 0)
			printObject.resultOfRoundFunctionFK1 = objectHolder.leftString.concat(objectHolder.rightString);
		else
			printObject.resultOfRoundFunctionFK2 = objectHolder.leftString.concat(objectHolder.rightString);

		if (i < 1)	//if the current round is not the last do the switch function
		{
			objectHolder = switchFunction(objectHolder.leftString, objectHolder.rightString);
			leftText = objectHolder.leftString;
			rightText = objectHolder.rightString;

			//Store the switch result to print to the screen later
			printObject.afterSwitch = leftText.concat(rightText);
			printObject.afterSwitchSplitLeft = leftText.slice();
			printObject.afterSwitchSplitRight = rightText.slice();
		}
	}

	outputText = objectHolder.leftString.concat(objectHolder.rightString);

	if (!encryptFlag)
	{
		outputText = ip(outputText);
	}
	else
	{
		outputText = ipInverse(outputText);
	}

	printObject.finalResult = outputText;

	return outputText;
}








function setEncryptFlag(flag)
{
	encryptFlag = flag;
}

function inputHandler()
{
	var inputText = document.getElementById("inputText").value;
	var inputKey = document.getElementById("inputKey").value;
	var i = 0;
	var text = [];
	var key = [];
	var textOutput;

    //Check to see if user inputed text is in the correct format and length
	if(!(/[01]{8}/.test(inputText)))
	{
		$("#inputError").show();
		return;
	}

	//Check to see if user inputed key is in the correct format and length
	if(!(/[01]{10}/.test(inputKey)))
	{
		$("#inputError").show();
		return;
	}

	//convert userinputed text to an array of numbers
	inputText = inputText.split("");
	for (i = 0; i < 8; i++)
	{
		text.push(Number(inputText[i]));
	}

	//convert userinputed key to an array of numbers
	inputKey = inputKey.split("");
	for (i = 0; i < 10; i++)
	{
		key.push(Number(inputKey[i]));
	}

	//Store the inputText and inputKey in global object to print to the screen later
	printObject.text = inputText;
	printObject.key = inputKey;

	//Run the SDES algoritham, the result is the encrypted ciphertect or decrypted plaintext
	textOutput = sdes(text, key);
	
	generateAnswerPage();
	
	return textOutput;
}

function generateAnswerPage()
{
	var i = 0;

	$("#inputError").hide();
	$("#detailedOutput").show();

	//print input text
	$("#originalText").empty();
	for (i = 0; i < 8; i++)
	{
		$("#originalText").append("<td>" + printObject.text[i] + "</td>");
	}

	//print input key
	$("#originalKey").empty();
	for (i = 0; i < 10; i++)
	{
		$("#originalKey").append("<td>" + printObject.key[i] + "</td>");
	}

	//print input key
	$("#originalKeyCopy").empty();
	for (i = 0; i < 10; i++)
	{
		$("#originalKeyCopy").append("<td>" + printObject.key[i] + "</td>");
	}

	//print result of P10
	$("#afterP10Key").empty();
	for (i = 0; i < 10; i++)
	{
		$("#afterP10Key").append("<td>" + printObject.afterP10Key[i] + "</td>");
	}

	//print result of first split
	$("#afterFirstSplitLeft").empty();
	$("#afterFirstSplitRight").empty();
	for (i = 0; i < 5; i++)
	{
		$("#afterFirstSplitLeft").append("<td>" + printObject.afterFirstSplitLeft[i] + "</td>");
	}
	for (i = 0; i < 5; i++)
	{
		$("#afterFirstSplitRight").append("<td>" + printObject.afterFirstSplitRight[i] + "</td>");
	}

	//print result of LS-1 of the results of the first split
	$("#afterLeftLS1").empty();
	$("#afterRightLS1").empty();
	for (i = 0; i < 5; i++)
	{
		$("#afterLeftLS1").append("<td>" + printObject.afterLeftLS1[i] + "</td>");
	}
	for (i = 0; i < 5; i++)
	{
		$("#afterRightLS1").append("<td>" + printObject.afterRightLS1[i] + "</td>");
	}

	//print subkey K1
	$("#subKeyK1").empty();
	for (i = 0; i < 8; i++)
	{
		$("#subKeyK1").append("<td>" + printObject.subKeyK1[i] + "</td>");
	}

	//print result of LS-2 of the two halfs
	$("#afterLeftLS2").empty();
	$("#afterRightLS2").empty();
	for (i = 0; i < 5; i++)
	{
		$("#afterLeftLS2").append("<td>" + printObject.afterLeftLS2[i] + "</td>");
	}
	for (i = 0; i < 5; i++)
	{
		$("#afterRightLS2").append("<td>" + printObject.afterRightLS2[i] + "</td>");
	}

	//print subkey K2
	$("#subKeyK2").empty();
	for (i = 0; i < 8; i++)
	{
		$("#subKeyK2").append("<td>" + printObject.subKeyK2[i] + "</td>");
	}

	//print input text
	$("#originalTextCopy").empty();
	for (i = 0; i < 8; i++)
	{
		$("#originalTextCopy").append("<td>" + printObject.text[i] + "</td>");
	}

	//print subkey K1
	$("#subKeyK1Copy").empty();
	for (i = 0; i < 8; i++)
	{
		$("#subKeyK1Copy").append("<td>" + printObject.subKeyK1[i] + "</td>");
	}

	//print subkey K2
	$("#subKeyK2Copy").empty();
	for (i = 0; i < 8; i++)
	{
		$("#subKeyK2Copy").append("<td>" + printObject.subKeyK2[i] + "</td>");
	}

	//print after IP
	$("#afterIP").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterIP").append("<td>" + printObject.afterIP[i] + "</td>");
	}

	//print result of first split
	$("#afterIPSplitLeft").empty();
	$("#afterIPSplitRight").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterIPSplitLeft").append("<td>" + printObject.afterIPSplitLeft[i] + "</td>");
	}
	for (i = 0; i < 4; i++)
	{
		$("#afterIPSplitRight").append("<td>" + printObject.afterIPSplitRight[i] + "</td>");
	}

	//print round 1 expansion permutation
	$("#afterEPRound1").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterEPRound1").append("<td>" + printObject.afterEPRound1[i] + "</td>");
	}

	//print: (round key K1) xor (round 1 expansion permutation)
	$("#afterXORK1").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterXORK1").append("<td>" + printObject.afterXORK1[i] + "</td>");
	}

	//print result of split of ((round key K1) xor (round 1 expansion permutation))
	$("#afterXORK1SplitLeft").empty();
	$("#afterXORK1SplitRight").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterXORK1SplitLeft").append("<td>" + printObject.afterXORK1SplitLeft[i] + "</td>");
	}
	for (i = 0; i < 4; i++)
	{
		$("#afterXORK1SplitRight").append("<td>" + printObject.afterXORK1SplitRight[i] + "</td>");
	}

	//print result SBOX results, ROUND 1
	$("#afterS0Round1").empty();
	$("#afterS1Round1").empty();
	for (i = 0; i < 2; i++)
	{
		$("#afterS0Round1").append("<td>" + printObject.afterS0Round1[i] + "</td>");
	}
	for (i = 0; i < 2; i++)
	{
		$("#afterS1Round1").append("<td>" + printObject.afterS1Round1[i] + "</td>");
	}

	//print: P4 Round 1
	$("#afterP4Round1").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterP4Round1").append("<td>" + printObject.afterP4Round1[i] + "</td>");
	}

	//print: Final XOR of round1
	$("#afterFinalXORRound1").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterFinalXORRound1").append("<td>" + printObject.afterFinalXORRound1[i] + "</td>");
	}

	//print: result of first round function
	$("#resultOfRoundFunctionFK1").empty();
	for (i = 0; i < 8; i++)
	{
		$("#resultOfRoundFunctionFK1").append("<td>" + printObject.resultOfRoundFunctionFK1[i] + "</td>");
	}

	//print: result of switch function
	$("#afterSwitch").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterSwitch").append("<td>" + printObject.afterSwitch[i] + "</td>");
	}

	//print result SBOX results, ROUND 1
	$("#afterSwitchSplitLeft").empty();
	$("#afterSwitchSplitRight").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterSwitchSplitLeft").append("<td>" + printObject.afterSwitchSplitLeft[i] + "</td>");
	}
	for (i = 0; i < 4; i++)
	{
		$("#afterSwitchSplitRight").append("<td>" + printObject.afterSwitchSplitRight[i] + "</td>");
	}

	//print round 2 expansion permutation
	$("#afterEPRound2").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterEPRound2").append("<td>" + printObject.afterEPRound2[i] + "</td>");
	}

	//print: (round key K2) xor (round 2 expansion permutation)
	$("#afterXORK2").empty();
	for (i = 0; i < 8; i++)
	{
		$("#afterXORK2").append("<td>" + printObject.afterXORK2[i] + "</td>");
	}

	//print result of split of ((round key K2) xor (round 2 expansion permutation))
	$("#afterXORK2SplitLeft").empty();
	$("#afterXORK2SplitRight").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterXORK2SplitLeft").append("<td>" + printObject.afterXORK2SplitLeft[i] + "</td>");
	}
	for (i = 0; i < 4; i++)
	{
		$("#afterXORK2SplitRight").append("<td>" + printObject.afterXORK2SplitRight[i] + "</td>");
	}

	//print result SBOX results, ROUND 2
	$("#afterS0Round2").empty();
	$("#afterS1Round2").empty();
	for (i = 0; i < 2; i++)
	{
		$("#afterS0Round2").append("<td>" + printObject.afterS0Round2[i] + "</td>");
	}
	for (i = 0; i < 2; i++)
	{
		$("#afterS1Round2").append("<td>" + printObject.afterS1Round2[i] + "</td>");
	}

	//print: P4 Round 2
	$("#afterP4Round2").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterP4Round2").append("<td>" + printObject.afterP4Round2[i] + "</td>");
	}

	//print: Final XOR of round2
	$("#afterFinalXORRound2").empty();
	for (i = 0; i < 4; i++)
	{
		$("#afterFinalXORRound2").append("<td>" + printObject.afterFinalXORRound2[i] + "</td>");
	}

	//print: result of first round function
	$("#resultOfRoundFunctionFK2").empty();
	for (i = 0; i < 8; i++)
	{
		$("#resultOfRoundFunctionFK2").append("<td>" + printObject.resultOfRoundFunctionFK2[i] + "</td>");
	}


	//print FINAL RESULT
	$("#finalResult").empty();
	for (i = 0; i < 8; i++)
	{
		$("#finalResult").append("<td>" + printObject.finalResult[i] + "</td>");
	}
}