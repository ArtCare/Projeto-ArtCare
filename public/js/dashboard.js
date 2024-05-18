
Chart.defaults.color = "#292929";
Chart.defaults.font.size = 20;
Chart.defaults.plugins.legend.position = 'right';

const pieData = {
    datasets: [{
        label: 'Porcentagem de acerto',
        data: [20, 20, 60],
        backgroundColor: [
            '#C62400',
            '#DC9E00',
            '#575757'
        ],
        position: "#right"
    }],
    labels: ["Crítico", "Alerta", "Normal"],
    legend: "none"
};

const pieConfig = {
    type: 'pie',
    data: pieData,

};
const pieChart = new Chart(
    document.getElementById('pieChart'),
    pieConfig,
);

const labels = ["Setor 1", "Setor 4", "Setor 5","Setor 7", "setor 12"]
const barData = {
    labels: labels,
    datasets: [{
        label: 'Quantidade de vezes em estado de alerta',
        data: [5, 10, 7, 3, 4],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',

        ],
        borderWidth: 2
    }]
};

const barConfig = {
    type: 'bar',
    data: barData,
    options: {
        plugins: {
            legend: {
                display: false
            },
        }
    },
};

const barChart = new Chart(
    document.getElementById('barChart'),
    barConfig,
);
function logout() {
    window.location.href = "../login.html"
}