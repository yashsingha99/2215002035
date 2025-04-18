// import { getProcessedNumbers } from '../services/numbers.service';

const axios = require("axios");
const WINDOW_SIZE = 10;
let windowState = [];
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU0MDk3LCJpYXQiOjE3NDQ5NTM3OTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk0NDM3ZjA3LTJhNDQtNGNjNC1iMTAyLWMxMzdiYzY2ODdlNiIsInN1YiI6Inlhc2guZ2xhX2NzMjJAZ2xhLmFjLmluIn0sImVtYWlsIjoieWFzaC5nbGFfY3MyMkBnbGEuYWMuaW4iLCJuYW1lIjoieWFzaCBzaW5naGFsIiwicm9sbE5vIjoiMjIxNTAwMjAzNSIsImFjY2Vzc0NvZGUiOiJDTm5lR1QiLCJjbGllbnRJRCI6Ijk0NDM3ZjA3LTJhNDQtNGNjNC1iMTAyLWMxMzdiYzY2ODdlNiIsImNsaWVudFNlY3JldCI6IkJaQlhwTmtjTU5XaFd2c0gifQ.TLX9NbhZWUW2OyhYuETODrGyIYUJO6SVPkznB2f1A0o';
const getProcessedNumbers = async (id) => {
  const windowPrevState = [...windowState];
  let newNumbers = [];

  try {
    const response = await axios.get(`http://20.244.56.144/evaluation-service/even`, {
      timeout: 500,     
       headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },

    });
    newNumbers = Array.isArray(response.data.numbers)
      ? response.data.numbers
      : [];
  } catch {
    newNumbers = [];
  }

  newNumbers.forEach((num) => {
    if (!windowState.includes(num)) {
      if (windowState.length >= WINDOW_SIZE) windowState.shift();
      windowState.push(num);
    }
  });

  const avg =
    windowState.length > 0
      ? parseFloat(
          (windowState.reduce((a, b) => a + b, 0) / windowState.length).toFixed(
            2
          )
        )
      : 0.0;

  return {
    windowPrevState,
    windowCurrState: [...windowState],
    numbers: newNumbers,
    avg,
  };
};

const calculater = async (req, res) => {
  try {
    const { numid } = req.params;
    const result = await getProcessedNumbers(numid);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};


module.exports ={ calculater}


// module.exports = { getProcessedNumbers };
