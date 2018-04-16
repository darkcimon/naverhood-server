# 스키마 구조
## 로그인 유저
var UserSchema   = new Schema({
    deviceId:String(required),
	name: String,
	board: List<BoardSchema>
});
## 게시판
var BoardSchema   = new Schema({
    id:String(required),
    type:String(required),
	title: String,
	content: String,
	latitude:String,
	longitude:String,
});
