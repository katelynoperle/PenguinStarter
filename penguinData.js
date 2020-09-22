var penguinPromise = d3.json("../json/classData.json")

var succFCN = function(penguins)
{
    console.log("penguins",penguins);
    sortFinal(penguins);
    drawTable(penguins);
}


var failFCN = function(error)
{
    console.log("error",error)
}

penguinPromise.then(succFCN,failFCN);

var quizMean = function(penguin)
{ var getQuizGrades = function(quiz)
{
    return quiz.grade
}
var quizGrades = penguin.quizes.map(getQuizGrades)
var quizMean = d3.mean(quizGrades)
return quizMean
}

var hwMean = function(penguin)
{
    var getHwGrades = function(homework)
    {
        return homework.grade
    }
    var hwGrades = penguin.homework.map(getHwGrades)
    var hwMean = d3.mean(hwGrades)
    return hwMean
}
var testMean = function(penguin)
{
    var getTestGrades = function(test)
    {
        return test.grade
    }
    var testGrades = penguin.test.map(getTestGrades)
    var testMean = d3.mean(testGrades)
    return testMean
}

var finalGrade = function(penguin)
{
    var getFinalGrades = function(final)
    {
        return final.grade
    }
    var finalGrades = penguin.final.map(getFinalGrades)
    return finalGrades
}

var drawTable = function(penguins)
{
    var rows = d3.select("table tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr")
    
    rows.append("td")
    .append("img")
    .attr("src",function(penguins)
    {
        return "../imgs/"+penguins.picture
    });
    
    rows.append("td")
    .text(quizMean);
    
    rows.append("td")
    .text(hwMean);
    
    rows.append("td")
    .text(testMean);
    
    rows.append("td")
    .text(finalGrade)
}

var compareFinal = function(penguin1,penguin2)
{ 
    var finalGrade1 = penguin1.final[0].grade
    var finalGrade2 = penguin2.final[0].grade
if (finalGrade1 == finalGrade2)
            { 
                return 0
            }
        else if (finalGrade1 > finalGrade2)
            {
                return -1
            }
        else
            {
                return 1
            }
}

var sortFinal = function(penguins)
{ 
    d3.select("#finalGrade")
    .on("click",function()
        { 
            penguins.sort(compareFinal)
            d3.select("table tbody")
            .selectAll("*")
            .remove()
            drawTable(penguins)
        })
}