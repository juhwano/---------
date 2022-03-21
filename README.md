# 슬기로운 백신생활
> 코로나19 백신 후기 sns 웹 어플리케이션.
> 
![NPM Version](https://img.shields.io/badge/npm-8.3.1-green)
![Node Version](https://img.shields.io/badge/node-16.14-blue)
![Deploy Status](https://img.shields.io/badge/deploy-Local-critical)


![image](https://user-images.githubusercontent.com/77667889/159247980-cfe28576-20a3-43e8-bbe9-d3bb7e9bbc13.png)

<br/>
<br/>

## Video
https://www.loom.com/share/eb9a2c2f1d384cccb8058dff4cf64bb4

<br/>
<br/>

## Installation

```sh
npm install
```

<br/>

- 필요한 추가 파일 


![image](https://user-images.githubusercontent.com/77667889/159250296-c6bcc5b3-e512-4a31-82c9-a06454b72b7e.png)

<br/>

awsConfig : AWS s3 업로드 권한 설정파일<br/>

```sh
{
	"accessKeyId": "IAM에서받은액세스키ID입력바람",
	"secretAccessKey": "IAM에서받은시크릿액세스키입력바람",
	"region": "ap-northeast-2"
}
```

dbConfig : mongoDB 권한 설정파일<br/>
```sh
{
	"hostName" : "클러스터명",
	"dbPassword" : "비밀번호",
	"dbName" : "DB명"
}
```

jwtSecret : 시크릿키, 암호화 알고리즘 방식 설정파일<br/>
```sh
{
  "secretKey" : "시크릿키명",
  "algorithm" : "암호화 방식"
}
```
mailConfig : 메일 발송 설정파일<br/>
```sh
{
  "user": "구글아이디",
  "password": "비번"
}
```



<br/>
<br/>

## 개발기간
- 2021-10-08 ~ 2021-10-15

<br/>
<br/>

## 기술
- frontend : <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
- backend : <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">, <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
- database : <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

<br/>
<br/>

## 기능
- 회원가입, 로그인
- 실시간 채팅
- CRUD

<br/>
<br/>

## Contributing

1. Fork it (<https://github.com/juhwano/Life-Of-Vaccine/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
