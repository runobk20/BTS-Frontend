export function createChartData(bugsArr, levels, classification) {
    const data = [];

    levels.forEach(level => {
        const bugsCount = bugsArr.filter(bug => {
            if(bug[classification] === level) {
                return bug;
            }
        }).length;
        data.push({[level]: bugsCount})
    })

    return data.map(data => {
        const [key, value] = Object.entries(data)[0];
        return {x: key, y: value}
    });

}