<script setup lang="ts">
  /** Стандартные подключения TypeScript */

import { ref, computed } from 'vue'
  /** 
    @param questions Объект с вопросами ответами 
    @param quizCompleted Изначально указываем, что игра не завершена. После последнего вопроса меняем значение
    @param currentQuestion Номер вопроса. Когда страница только открыта, показывается первый(нулевой) вопрос. 
                           С каждым ответом, мы значение меняем
  **/
const questions = ref([
  {
    question: 'Какого падежа в рус⁣с⁣ком язы⁣ке не существует?',
    answer: 2,
    options: [ "Дательный", "Творительный", "Подложный","Винительный"],
    selected: null,
    price:100
  },{
    question: 'Что разбуд⁣ило Сп⁣ящую Краса⁣вицу?',
    answer: 1,
    options: [  "Шумные соседи", "Поцелуй принца","Будильник", "Телефон"],
    selected: null,
    price:100
  },{
    question: 'Что используют⁣ для поджаривания л⁣омтиков ⁣хлеба?',
    answer: 3,
    options: ["Постер", "Винчестер", "Компостер", "Тостер"],
    selected: null,
    price:100
  },{
    question: 'Какой обитатель водной стихи⁣и заслужил репута⁣цию ⁣отшельника?',
    answer: 0,
    options: ["Рак", "Бычок", "Дельфин", "Медуза"],
    selected: null,
    price:100
  },{
    question: 'Как называется повесть Ас⁣трид Л⁣индгрен: \"Малыш и...⁣\"?',
    answer: 0,
    options: ["..Карлсон", "..Иван", "..собака", "..Взрослый"],
    selected: null,
    price:100
  },{
    question: 'В како⁣й стране столица п⁣⁣орт?',
    answer: 2,
    options: ["Италия", "Канада","Сингапур", "Мексика"],
    selected: null,
    price:500
  },{
    question: 'Ск⁣олько корон на Государ⁣ственном гербе Р⁣Ф?',
    answer: 2,
    options: ["Одна", "Две","Три", "Пять"],
    selected: null,
    price:500
  },{
    question: 'На территории какой страны ⁣был от⁣⁣крыт золотоносный район Клондайк?',
    answer: 1,
    options: ["США","Канада", "Мексика", "Венесуэла"],
    selected: null,
    price:500
  },{
    question: 'Какой химиче⁣ский элемент назван в чес⁣ть злого подз⁣емного гнома?',
    answer: 0,
    options: ["Кобальт", "Берилий", "Теллур", "Гафний"],
    selected: null,
    price:1000
  },{
    question: '"Реки с каким⁣ назва⁣нием нет на террит⁣ории России?"',
    answer: 2,
    options: [ "Шея", "Уста","Спина", "Палец"],
    selected: null,
    price:1000
  },
  {
    question: '⁣Что чаще всего вешают ⁣на е⁣лку',
    answer: 3,
    options: ["Кубики", "Тюбики", "Зубики","Шарики"],
    selected: null,
    price:3000
  }  
])
const quizCompleted = ref(false)
const currentQuestion = ref(0)
  // После каждого ответа определяем какой вопрос, и результат игрока на данный момент.
const score=computed(()=>{
  let value = 0;
  let trueAnswer = 0;
  questions.value.map(q=>{
    if (q.selected==q.answer){
      value = value+q.price
      trueAnswer++
    }
  })
  return {value, trueAnswer}
})
  // Получаем вопрос и ответы для него по его номеру (индексу) 
const getCurrentQuestion = computed(() => {
  let question:{
    question: string;
    answer: number;
    options: string[];
    selected: any;
    price:number;
    index?:any
  } = questions.value[currentQuestion.value]|| {}
  question.index = currentQuestion.value
  return question
})
  //Действия при выборе ответа на вопрос
const SetAnswer = (evt:any) =>{
  questions.value[currentQuestion.value].selected = evt.target.value;
  evt.target.value=null
}
  //Кнопка перехода на следующий вопрос
const NextQuestion=()=>{
  if (currentQuestion.value<questions.value.length-1) {
    currentQuestion.value++
  } else{
    quizCompleted.value=true
  } 
}

</script>

<template>
  <main class="app">
    <h1>Игра викторина</h1>
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question"> {{ getCurrentQuestion.question }}</span>
        <span class="score">Счет:{{score.value}} баллов<br>{{currentQuestion}} из {{questions.length-1}} </span>
      </div>
      <div class="options">
        <label 
          v-for="(options, index) in getCurrentQuestion.options"
          :key="index"
          :class ="`option ${
            getCurrentQuestion.selected == index 
              ? index == getCurrentQuestion.answer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected !=null && 
            index != getCurrentQuestion.selected
              ? 'disabled'
              :''
          }`"
        >
          <input 
            type="radio" 
            :name="getCurrentQuestion.index" 
            :value = "index"
            v-model = "getCurrentQuestion.selected"
            :disabled = "getCurrentQuestion.selected"
            @change="SetAnswer"
          >
          <span>{{options}}</span>
        </label>
      </div>
      <button
        @click="NextQuestion"
        :disabled ="!getCurrentQuestion.selected"
      >
        {{
          getCurrentQuestion.index == questions.length -1
            ? 'Завершить'
            : getCurrentQuestion.selected ==null
              ? 'Выберите ответ'
              : 'Следующий вопрос'
        }}
      </button>
    </section>
    <section v-else>
      <h2>Вы прошли викторину</h2>
      <p>Ваш счет {{score.value}}. Правильных ответов {{score.trueAnswer}} из {{questions.length}}</p>
    </section>
  </main>
  
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}
body {
	background-color: #271c36;
	color: #FFF;
}
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	height: 100vh;
}
h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
}
.quiz {
	background-color: #382a4b;
	padding: 1rem;
	width: 100%;
	max-width: 640px;
}
.quiz-info {
	display: flex;
	justify-content: space-between;
  gap:10px;
	margin-bottom: 1rem;
}
.quiz-info .question {
	color: #8F8F8F;
	font-size: 1.25rem;
}
.quiz-info.score {
	color: #FFF;
	font-size: 1.25rem;
}
.options {
	margin-bottom: 1rem;
}
.option {
	padding: 1rem;
	display: block;
	background-color: #271c36;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
}
.option:hover {
	background-color: #2d213f;
}
.option.correct {
	background-color: #2cce7d;
}
.option.wrong {
	background-color: #ff5a5f;
}
.option:last-of-type {
	margin-bottom: 0;
}
.option.disabled {
	opacity: 0.5;
}
.option input {
	display: none;
}
button {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #2cce7d;
	color: #2d213f;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1.2rem;
	border-radius: 0.5rem;
}
button:disabled {
	opacity: 0.5;
}
h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
}
p {
	color: #8F8F8F;
	font-size: 1.5rem;
	text-align: center;
}
</style>
