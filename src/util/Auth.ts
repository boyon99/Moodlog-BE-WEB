import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { tokenList } from '../app'

require('dotenv').config()

// 비밀번호 암호화 진행 (becrypt)
export const generatePassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(pw, salt)

  return password
}

// userpayload를 기반으로 액세스 토큰 생성 (jsonwebtoken)
export const generateAccessToken = (id: number, username: string, email: string) => {
  return jwt.sign({ id, username, email }, process.env.SECRET_ATOKEN, {
    expiresIn: '1h',
  })
}

// 리프레시토큰 생성 (jsonwebtoken)
export const generateRefreshToken = (id: number, username: string, email: string) => {
  return jwt.sign({ id, username, email }, process.env.SECRET_RTOKEN, {
    expiresIn: '30d',
  })
}

// tokenList에 발급한 토큰을 저장(등록)
export const registerToken = (refreshToken: string, accessToken: string) => {
  tokenList[refreshToken] = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

// 리프레시 혹은 로그아웃 시 해당 토큰을 tokenList에서 삭제
export const removeToken = (refreshToken: string) => {
  delete tokenList[refreshToken]
}
