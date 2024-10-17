import axios from 'axios'

const sendEmail = data => {
  return new Promise(resolve => {
    const response = axios.post(
      'https://us-central1-integra-oikonomos.cloudfunctions.net/sendMailAttachment2',
      data
    )
    resolve(response)
  })
}

export { sendEmail }
