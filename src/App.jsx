import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

 
    useEffect(() => {
      fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://quizapi.io/api/v1/questions', {
          headers: { 'X-Api-Key': 'LGRp4PBuKc2gWx3DdKnAzCYaAvDe8iFxPY5njqdm' },
          params: {
            limit: 10, // Adjust number of questions
            category: 'Code', // Change category if needed
            difficulty: 'Medium', // Optional
          },
        });
        setQuestions(response.data);
        setCurrentQuestion(0); // Reset question index
        setScore(0); // Reset score
        setShowScore(false); // Hide score
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetch is done
      }
    };
    
  

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    fetchQuestions(); // Fetch questions again
  };

  return (
   <div className='w-full h-screen bg-gradient-to-r from-[#897fb1] to-violet-600 flex justify-center items-center'>
    <div className=' bg-white w-[320px] h-[600px] rounded-lg shadow-lg flex justify-start items-center flex-col'>
        <div className='bg-gray-50 h-[60px] w-[75%] flex justify-center items-center'>
          <h1 className='font-extrabold text-4xl'>Quiz App</h1>
        </div>
        
        {loading ? (
          // Display the loader while loading is true
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-[#897fb1] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#897fb1] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#897fb1] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : showScore ? (
        <div className="text-center h-full flex justify-center items- flex-col">
          <h2 className="text-2xl font-bold mb-4">You scored <span className='text-2xl font-bold text-[#897fb1]'>{score}</span>  out of {questions.length}.</h2>
          <button
              onClick={handleRestartQuiz}
              className="mt-4 py-2 px-4 bg-[#897fb1] text-white rounded-lg"
            >
              Take Quiz Again
            </button>
        </div>
      ) : (
        <div className=' h-full w-[90%]'>
        <div className='w-full my-10'>
          <p className='text-xl text-yellow-600 font-semibold pl-3'> <span className='font-extrabold text-2xl'> {currentQuestion + 1}</span> / 10 </p>
        </div>
        <div className='min-h-[75px] mx-auto w-[90%]'>
          <p className='text-xl font-bold'>
          {questions.length > 0 && questions[currentQuestion].question}
          </p>
        </div>
        <div className="flex flex-col min-w-[75%] max-h-[300px] items-center my-5 overflow-auto">
        {questions.length > 0 && questions[currentQuestion].answers && Object.entries(questions[currentQuestion].answers).map(([key, answer], index) => {
                return answer && (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(key === questions[currentQuestion].correct_answer)}
                    className="w-full py-2 my-1 px-4 bg-[#897fb1] text-white rounded-md"
                  >
                    {answer}
                  </button>
             );
            })}
          </div>
          </div>
      )}
    </div>
   </div>
  )
}

export default App
