export default function BaseballGame() {
    this.init = function() {
        let numbers = Array.from({ length: 9 }, (_, i) => i + 1)

        let idx = MissionUtils.Random.pickNumberInRange(0, 8)
        let a = numbers.splice(idx, 1)

        idx = MissionUtils.Random.pickNumberInRange(0, 7)
        let b = numbers.splice(idx, 1)

        idx = MissionUtils.Random.pickNumberInRange(0, 6)
        let c = numbers.splice(idx, 1)

        console.log(`${a} ${b} ${c}`)
        return 100 * a + 10 * b + c;
    }

    this.getMessage = function (strike, ball) {
        if (ball > 0 && strike === 0)
            return `${ball}볼`
        else if (strike > 0 && ball > 0)
            return `${ball}볼 ${strike}스트라이크`
        else if (strike > 0)
            return `${strike}스트라이크`
        else
            return '낫싱'
    }

    this.sanityCheck = function (userInputNumbers) {
        const numStr = userInputNumbers.toString();
        return new Set(numStr).size === numStr.length;
    }

    this.play = function (computerInputNumbers, userInputNumbers) {
        // 로그 남기는 법
        console.log(`컴퓨터 입력: ${computerInputNumbers}, 사용자 입력: ${userInputNumbers}`);

        let ball = 0
        let strike = 0

        computerInputNumbers = computerInputNumbers.toString()
        userInputNumbers = userInputNumbers.toString()

        for (let i = 0; i < userInputNumbers.length; i++) {
            if (computerInputNumbers.charAt(i) === userInputNumbers.charAt(i)) {
                strike++
            } else if (computerInputNumbers.includes(userInputNumbers.charAt(i)))
                ball++
        }

        console.log(`strikes: ${strike}, balls: ${ball}`);
        console.log(`${this.getMessage(strike, ball)}`)

        return this.getMessage(strike, ball)
    };

    /*
    this.badSanityCheck = function (userInputNumbers) {
        userInputNumbers = userInputNumbers.toString()
        let charArray = [...userInputNumbers];
        let set = new Set()

        for (let char of charArray) {
            if (set.has(char))
                return false
            set.add(char)
        }

        return true
    }*/
}

document.addEventListener("DOMContentLoaded", function () {
        const game = new BaseballGame();
        game.init()
        game.play(123, 456); // '낫싱'
        game.play(123, 345); // '1볼'
        game.play(123, 432); // '2볼'
        game.play(123, 312); // '3볼'
        game.play(123, 145); // '1스트라이크'
        game.play(123, 134); // '1볼 1스트라이크'
        game.play(123, 132); // '2볼 1스트라이크'
        game.play(123, 124); // '2스트라이크'
});


