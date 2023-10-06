import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


const fetchuser = async (req, res, next) => {
    const cookiesStore = cookies();
    var authToken = cookiesStore.get('authToken')
    if (!authToken) {
        const error = new Error('Please login or authenticate using a valid token')
        error.statusCode = 401
        error.name = "Invalid Authentication token "
        throw error
    }
    else {
        authToken = authToken.value
        const data = jwt.verify(authToken, process.env.authSecret)
        req.user = data.user
    }

}

export default fetchuser;