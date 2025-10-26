
function distance(a,b){
    return Math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2 + (a[2] - b[2])**2);
}

function mean(cluster){
    const n = cluster.length;
    const sum = cluster.reduce((acc, val)=> [acc[0] + val[0], acc[1] + val[1], acc[2] + val[2]], [0, 0, 0]);
    return sum.map(s => Math.round(s / n));
}

function initializeCentroids(data, k) {
    let centroids = [];

    centroids.push(data[Math.floor(Math.random() * data.length)]);

    while (centroids.length < k) {
        const distances = data.map(p => {

            const dists = centroids.map(c => distance(p, c));
            const minDist = Math.min(...dists);
            return minDist ** 2;
        });

        const totalDistance = distances.reduce((a, b) => a + b, 0);
        const probabilities = distances.map(d => d / totalDistance);
        
        let r = Math.random();
        let cummulative = 0;
        for (let i = 0; i < probabilities.length; i++) {
            cummulative += probabilities[i];
            if (r <= cummulative) {
                centroids.push(data[i]);
                break;
            }
        }
    }
    return centroids;
}

function kmeans(data, k, maxIterations = 10) {
    let centroids = initializeCentroids(data, k);
    
    for (let iter = 0; iter < maxIterations; iter++) {
        let clusters = Array.from({ length: k}, ()=> []);
        data.forEach(p => {
            const distances = centroids.map(c => distance(p, c));
            const minIndex = distances.indexOf(Math.min(...distances));
            clusters[minIndex].push(p);
        });

        for (let i = 0; i < k; i++) {
            if (clusters[i].length > 0) {
                centroids[i] = mean(clusters[i]);
            }
        }
    }
    return centroids;
}

export { kmeans };
        