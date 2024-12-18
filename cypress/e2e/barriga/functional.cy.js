import loc from "../../support/locators";
import "../../support/commandsContas";

describe("Should test at a functional level", () => {
  before(() => {
    cy.login("a@a", "a");
    cy.resetApp();
  });

  it("Should create an account", () => {
    cy.acessarMenuConta();
    cy.inserirConta("Conta de Teste");
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso!");
  });

  it("Should update an account", () => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.login("a@a", "a");
    cy.acessarMenuConta();
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR("Conta para alterar")).click();
    cy.get(loc.CONTAS.NOME).clear().type("Conta Alterada");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "Conta atualizada com sucesso!");
  });

  it("Should not create a acconunt with same name", () => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.login("a@a", "a");
    cy.acessarMenuConta();
    cy.get(loc.CONTAS.NOME).clear().type("Conta mesmo nome");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });

  it("Should create a transaction", () => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.login("a@a", "a");
    cy.get(loc.MENU.MOVIMENTACAO).click();
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type("desc");
    cy.get(loc.MOVIMENTACAO.VALOR).type("123");
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type("INTER");
    cy.get(loc.MOVIMENTACAO.CONTA).select("Conta para movimentacoes");
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
  });

  it("should get balance", () => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.login("a@a", "a");
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta para saldo")).should(
      "contain",
      "534,00"
    );
  });

  it("should remove a transation", () => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.login("a@a", "a");
    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(
      loc.EXTRATO.FN_XP_REMOVER_ELEMENTO("Movimentacao para exclusao")
    ).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
  });
});
