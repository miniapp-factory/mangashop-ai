export async function POST(request: Request) {
  const { questionId, answer } = await request.json();

  const questions = [
    { id: 1, text: "Lionel Messi has won more Ballon d'Or awards than Cristiano Ronaldo.", correct: true },
    { id: 2, text: "The 1998 FIFA World Cup was held in France.", correct: true },
    { id: 3, text: "The first FIFA World Cup was held in 1930.", correct: true },
    { id: 4, text: "The Netherlands has won the World Cup.", correct: false },
    { id: 5, text: "The 2014 World Cup final was played in Rio de Janeiro.", correct: false },
    { id: 6, text: "Zinedine Zidane scored a hat-trick in the 1998 World Cup final.", correct: false },
    { id: 7, text: "The 2006 World Cup was hosted by Germany.", correct: true },
    { id: 8, text: "The 2010 World Cup was held in South Africa.", correct: true },
    { id: 9, text: "The 2022 World Cup was held in Qatar.", correct: true },
    { id: 10, text: "The 2026 World Cup will be hosted by the United States, Canada, and Mexico.", correct: true },
  ];

  const question = questions.find((q) => q.id === questionId);
  const correct = question?.correct === answer;

  return new Response(JSON.stringify({ correct }), {
    headers: { "Content-Type": "application/json" },
  });
}
