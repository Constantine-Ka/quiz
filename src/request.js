import axios from 'axios';

const response = () => {
    const randomNumber = (min, max)=>Math.floor(Math.random() * (max - min + 1) + min);
    let questionArr = new Array;
    const getQuestions = ({type,count,price}) => {
        axios.get(`https://engine.lifeis.porn/api/millionaire.php?qType=${type}&count=${count}`)
            .catch(err => console.log(err))
            .then(res => {
                let dataArr;
                dataArr = res.data.data[0].answers;
                console.log("🚀 ~ file: App.vue ~ line 19 ~ getQuestions ~ dataArr", dataArr)
                res.data.data.forEach(e => {
                    let answerArr = e.answers;
                    let answerIndex = randomNumber(0, 4);
                    (answerIndex == 0) ? '' : [answerArr[answerIndex], answerArr[0]] = [answerArr[0], answerArr[answerIndex]];
                    let obj = JSON.stringify({
                        question: e.question,
                        answer: answerIndex,
                        options: JSON.stringify(answerArr),
                        price,
                        selected: null,
                        index: ''
                    });
                    questionArr.push(obj)
                });
                console.log("36", questionArr);
            }
        )
    };

    getQuestions({
        type: 1,
        count: 5,
        price: 100
    });
    getQuestions({
        type: 2,
        count: 3,
        price: 500
    });
    getQuestions({
        type: 3,
        count: 2,
        price: 1000
    });
    getQuestions({
        type: 4,
        count: 1,
        price: 5000
    });
}
export default{
    response
}
