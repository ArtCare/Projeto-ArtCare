
function simulador() {
    const custoTotal = Number(document.getElementById('manutencao').value)
    const period = Number(document.getElementById('periodo').value)
    const porcentagem = Number(document.getElementById('porcentagemPerda').value)

    let custo = custoTotal * period
    let custoComArtCare = custo - (custo * (porcentagem / 100))

    let economia = custo - custoComArtCare


    content.innerHTML = `
    <div class="tableContent" data-aos="fade-up" data-aos-duration="1500">
    <div class="table">
        <div class="tableHead">
           
                <p>Custo de manutenção</p>
                <p>Periodo</p>
                <p>Gasto sem ArtCare</p>   
           
        </div>
        
        <div class="line">
        <p> ${custo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
        <p>${period} meses</p>
        <p style="color: #FF3636; font-weight: bold">${custo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
        
        </div>
        </tbody>
        </table>
        
        <div class="tableHead">

             <p>Custo de manutenção</p>
                <p>Periodo</p>
                <p>Gasto com ArtCare</p>   
       
    </div>
    <div class="line">
        <p> ${custo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
        <p>${period} meses</p>
        <p style="color: #00B336; font-weight: bold">${custoComArtCare.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>

        </div>
    </div>
        <br>
    <div class='titleDiv'>
        <p class="description">É possivel economizar aproximadamente <span style="color: #00B336; font-weight: bold">
            ${economia.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>,
             que equivale à ${porcentagem}% em reparos de obra, caso utilize nossa solução.</p>
    </div>
    <button class="btnForm" onclick="reload()">Voltar ao simulador!</button>
    </div>

    `
}