// Populate test results table
const testResultsBody = document.getElementById('test-results-body');
if (testResultsBody) {
    const testResults = [
        { module: 'User Authentication', date: '2025-08-26', result: 'Pending' },
        { module: 'Data Integration', date: '2023-02-16', result: 'unfixed' },
        // ...
    ];

    function crearFila(resultado) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resultado.module}</td>
            <td>${resultado.date}</td>
            <td>${resultado.result}</td>
        `;
        return row;
    }

    testResults.forEach((result) => {
        testResultsBody.appendChild(crearFila(result));
    });
}

// Generate report
const generateReportButton = document.getElementById('generate-report');
const reportContainer = document.getElementById('report-container');
if (generateReportButton && reportContainer) {
    generateReportButton.addEventListener('click', () => {
        fetch('/generate-report')
            .then((response) => response.text())
            .then((report) => {
                reportContainer.innerHTML = report;
            })
            .catch((error) => {
                reportContainer.innerHTML = 'Error al generar el informe';
                console.error(error);
            });
    });
}

const comentariosForm = document.getElementById('comentarios-form');
const comentariosTextarea = document.getElementById('comentarios-textarea');
const guardarComentariosButton = document.getElementById('guardar-comentarios');
const comentariosAlmacenadosDiv = document.getElementById('comentarios-almacenados');
if (comentariosForm && comentariosTextarea && guardarComentariosButton && comentariosAlmacenadosDiv) {
    guardarComentariosButton.addEventListener('click', () => {
        const comentarios = comentariosTextarea.value.trim();
        if (comentarios !== '') {
            const comentariosAlmacenados = localStorage.getItem('comentarios');
            if (comentariosAlmacenados === null) {
                localStorage.setItem('comentarios', comentarios);
            } else {
                localStorage.setItem('comentarios', comentariosAlmacenados + '\n' + comentarios);
            }
            actualizarComentarios();
            comentariosTextarea.value = '';
        }
    });

    function actualizarComentarios() {
        const comentariosAlmacenados = localStorage.getItem('comentarios');
        if (comentariosAlmacenados !== null) {
            comentariosAlmacenadosDiv.innerText = comentariosAlmacenados;
        }
    }

    actualizarComentarios();
}