export default {
  authenticate: process.env.API_URL + '/auth/login',
  createUser: process.env.API_URL + '/usuario',
  listStudy: process.env.API_URL + '/estudo',
  listCategory: process.env.API_URL + '/categoria',
  createStudy: process.env.API_URL + '/estudo',
  nextQuestion: process.env.API_URL + '/estudo/proxima-questao?estudoId=',
  answerQuestion: process.env.API_URL + '/estudo/resolver-questao',
}
