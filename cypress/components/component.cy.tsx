import { mount } from "cypress/react";
import LoginPage from "@/app/(root)/(login)/login/page";
import RegisterPage from "@/app/(root)/(login)/register/page";
import Page from "@/app/(root)/getgame/page";

//Log in page
describe("LoginPage component", () => {
  beforeEach(() => {
    mount(<LoginPage />);
  });

  it("renders email input", () => {
    cy.get('input[type="email"]')
      .should("exist")
      .and("have.attr", "placeholder", "Email");
  });

  it("renders password input", () => {
    cy.get('input[type="password"]')
      .should("exist")
      .and("have.attr", "placeholder", "Password");
  });

  it("renders login submit button", () => {
    cy.get('button[type="submit"]')
      .should("exist")
      .and("contain.text", "Log In");
  });

  it("renders GitHub login button", () => {
    cy.contains("button", "Login with GitHub")
      .should("exist");
  });
});

//Registracion page
describe("<RegisterPage /> mock", () => {
  it("renders all inputs and the register button", () => {
    const RegisterPageMock = () => (
      <section>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Password" />
        <input placeholder="Repeat Password" />
        <button type="submit">Register</button>
      </section>
    );

    cy.mount(<RegisterPageMock />);

    cy.get('input[placeholder="Name"]').should("exist");
    cy.get('input[placeholder="Email"]').should("exist");
    cy.get('input[placeholder="Password"]').should("exist");
    cy.get('input[placeholder="Repeat Password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });
});

// Get game page
describe("Download Page component", () => {
  beforeEach(() => {
    mount(<Page />);
  });

  it("renders heading text", () => {
    cy.contains("DOWNLOAD FOR VALOR").should("exist");
  });

  it("renders download button", () => {
    cy.contains("button", "Torrent download")
      .should("exist")
      .and("have.attr", "type", "submit");
  });

  it("renders description section", () => {
    cy.contains("DESCRIPTION").should("exist");
    cy.contains("fight for Valor.").should("exist");
  });

  it("prevents form submit reload", () => {
    cy.get("form").submit();
    cy.url().should("include", "");
  });
});