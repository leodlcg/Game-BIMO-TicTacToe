export function Player(name, wins = 0) {
    
    const getName = () => name;
    const getWin = () => wins;
    const addWin = () => {wins++;};

    return {
        getName,
        getWin,
        addWin
    }

}


