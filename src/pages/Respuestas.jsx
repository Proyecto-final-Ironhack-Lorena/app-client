import { Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as BackendService from "../services/auth.services";



function Respuestas() {

    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState(null);
    const params = useParams()


    

    useEffect(() => {
        const uniqueQuestion = async () => {
            const answers = await BackendService.getAnswers(params.id);
            setQuestion(answers.data[0].question)
            setAnswers(answers.data)
        }
        uniqueQuestion()
    }, [params.id])


  return (
    <div>
        <Typography variant="h3">{question && question.title }</Typography>
        <Typography variant="p">{question && question.description}</Typography>
        <Typography variant="h4">Respuestas</Typography>

        {answers && answers[0]._id && answers.map((answer) => {
        return (
            <Card sx={{ width: 600 }} variant="outlined">
              <CardContent>
                <Typography variant="body2">{answer.description}</Typography>
              </CardContent>
            </Card>
        );
      })}
        
    

    </div>
  )
}

export default Respuestas;