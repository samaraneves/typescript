import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView')
    private mensagemView: MensagemView = new MensagemView('#mensagemView')
    
    constructor() {
        this.inputData = document.querySelector('#data')
        this.inputQuantidade = document.querySelector('#quantidade')
        this.inputValor = document.querySelector('#valor')
        this.negociacoesView.update(this.negociacoes)
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao()

        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
            .update('As negociações devem ser registradas apenas em dias úteis.')
            return
        } 
        this.negociacoes.adiciona(negociacao)
        this.limparFormulario()
        this.atualizaView()
    }

    private criaNegociacao(): Negociacao {
        const exp = /-/g
        const date = new Date(this.inputData.value.replace(exp, ','))
        const quantidade = parseInt(this.inputQuantidade.value)
        const valor = parseFloat(this.inputValor.value)

        return new Negociacao(
            date, 
            quantidade, 
            valor
        )
    }

    private limparFormulario(): void {
        this.inputData.value = ''
        this.inputQuantidade.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update('Negociação adicionada com sucesso!')
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO
    }
}