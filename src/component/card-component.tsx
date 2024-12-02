import React, { Component } from 'react';
import "./card-component.css";

type _state = {
    cardPairs: any,
    isGameStarted: Boolean,
    pointCounter: number,
    countDown: string,
    showPopupMsg: boolean,
}

type _props = {

}


export class Card extends Component<_props, _state> {

    state: _state = {
        cardPairs: [
            { value: 'bots-1', show: true, img: 'https://avatars.dicebear.com/api/bottts/seed-6.svg' },
            { value: 'female-1', show: true, img: "https://avatars.dicebear.com/api/female/seed.svg" },
            { value: 'avatars-1', show: true, img: "https://avatars.dicebear.com/api/avataaars/seed.svg" },
            { value: 'grid-1', show: true, img: "https://avatars.dicebear.com/api/gridy/seed-5.svg" },
            { value: 'human-1', show: true, img: "https://avatars.dicebear.com/api/human/seed.svg" },
            { value: 'micah-1', show: true, img: "https://avatars.dicebear.com/api/micah/seed-7.svg" },
            { value: 'jdenticon-1', show: true, img: "https://avatars.dicebear.com/api/jdenticon/seed-1.svg" },
            { value: 'micah-2', show: true, img: "https://avatars.dicebear.com/api/micah/seed.svg" },
            { value: 'bots-1', show: true, img: 'https://avatars.dicebear.com/api/bottts/seed-6.svg' },
            { value: 'female-1', show: true, img: "https://avatars.dicebear.com/api/female/seed.svg" },
            { value: 'avatars-1', show: true, img: "https://avatars.dicebear.com/api/avataaars/seed.svg" },
            { value: 'grid-1', show: true, img: "https://avatars.dicebear.com/api/gridy/seed-5.svg" },
            { value: 'human-1', show: true, img: "https://avatars.dicebear.com/api/human/seed.svg" },
            { value: 'micah-1', show: true, img: "https://avatars.dicebear.com/api/micah/seed-7.svg" },
            { value: 'jdenticon-1', show: true, img: "https://avatars.dicebear.com/api/jdenticon/seed-1.svg" },
            { value: 'micah-2', show: true, img: "https://avatars.dicebear.com/api/micah/seed.svg" }
        ],
        isGameStarted: false,
        pointCounter: 0,
        countDown: '00:00',
        showPopupMsg: false

    };
    pairIndex: any[] = [];
    contDownLimit = 0.5;
    countdownInterval: any;

    tick() {
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    flipCard(value: any, index: any) {
        const { cardPairs } = this.state;
        console.log("this.pairIndex.length", this.pairIndex.length)
        if (this.pairIndex.length < 2) {
            cardPairs[index].show = true;

            this.pairIndex.push(index);
            this.setState({ cardPairs });
            if (this.pairIndex.length === 2) {
                if (cardPairs[this.pairIndex[0]].value !== cardPairs[this.pairIndex[1]].value) {
                    setTimeout(() => {
                        cardPairs[this.pairIndex[0]].show = false;
                        cardPairs[this.pairIndex[1]].show = false;
                        this.setState({ cardPairs });
                        this.pairIndex = [];
                    }, 500)
                } else {
                    this.pairIndex = [];
                    this.setState((prevState: _state, props: _props) => ({
                        pointCounter: prevState.pointCounter + 1
                    }), () => {
                        const { pointCounter } = this.state;
                        if (pointCounter === 8) {
                            if (this.countdownInterval) {
                                clearInterval(this.countdownInterval);
                            }
                            this.setState({ showPopupMsg: true });
                        }
                    })
                }
            }
        } else {

        }
    }

    startGame(value: string) {
        const { cardPairs, isGameStarted } = this.state;
        for (let i in cardPairs) {
            cardPairs[i].show = false;
        }
        this.countDown(value);
        this.setState({ cardPairs, pointCounter: 0 });
    }


    imageCard() {
        const { cardPairs } = this.state;
        return cardPairs.map((item: any, index: any) => {
            if (item.show) {
                return <div className="cell show-cell"><img src={item.img} height="auto" width={96} alt="Avatar" /></div>
            } else {
                return <div onClick={(item) => this.flipCard(item, index)} className="cell hide-cell"></div>
            }
        }
        )
    }

    countDown(value: string) {
        let timer: number = this.contDownLimit * 60;
        let minutes: number;
        let seconds: number;
        if (value === 'start') {
            this.countdownInterval = setInterval(() => {
                minutes = Math.floor(timer / 60);
                seconds = Math.floor(timer % 60);

                minutes = Number(minutes < 10 ? "0" + minutes : minutes);
                seconds = Number(seconds < 10 ? "0" + seconds : seconds);

                this.setState({ countDown: minutes + ":" + seconds });

                if (--timer < 0) {
                    const { pointCounter } = this.state;
                    this.setState({ showPopupMsg: true });
                    clearInterval(this.countdownInterval);
                }
            }, 1000);
            this.setState((prevState: _state, props: _props) => ({ isGameStarted: !prevState.isGameStarted }));
        } else {
            clearInterval(this.countdownInterval);
            this.setState((prevState: _state, props: _props) => ({
                countDown: "00:00", isGameStarted: !prevState.isGameStarted
            }
            ));
            this.countDown('start');
        }
    }

    close() {
        this.setState({ showPopupMsg: false });
        const { cardPairs } = this.state;
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        this.setState((prevState: _state, props: _props) => ({
            countDown: "00:00", isGameStarted: !prevState.isGameStarted
        }
        ));
        for (let i in cardPairs) {
            cardPairs[i].show = true;
        }
    }

    render() {
        const { isGameStarted, pointCounter, countDown, showPopupMsg } = this.state;
        return (
            <div className="main-container">
                {showPopupMsg && <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => this.close()} >&times;</span>
                        {pointCounter < 8 && <p className='participant-text'>Oohh! Your time is up! Your score is: {pointCounter} out off 8</p>}
                        {pointCounter === 8 && <p className='winner-text'>You won. Score: {pointCounter} Time Left: {countDown}</p>}
                    </div>
                </div>}
                <div className='start-btn'> <button onClick={() => !isGameStarted ? this.startGame('start') : this.startGame('restart')}>{!isGameStarted ? 'start' : 'restart'}</button></div>
                <div className="timer">Count Down : {countDown}</div>
                <div className="cell-container">
                    {this.imageCard()}
                </div>
            </div>
        )
    }
}