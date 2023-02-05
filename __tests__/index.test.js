import { render, screen } from "@testing-library/react";
import Index, { getStaticProps } from "../src/pages/index";

describe("index", () => {
  describe("Component", () => {
    it("renderice", () => {
      const { getByTestId } = render(
        <Index
          pokemones={[{ name: "chanchito feliz", url: "/pokemon/detalle/1" }]}
        />
      );
      const paragraph = getByTestId("titulo");
      expect(paragraph).toBeInTheDocument();
      const chanchito = screen.getByText("chanchito feliz");
      expect(chanchito).toBeInTheDocument();
      const url = chanchito.getAttribute("href");
      expect(url).toEqual("pokemones/1");
    });
  });

  describe("getStaticProps", () => {
    it("return pokemones", async () => {
      global.fetch = jest.fn().mockImplementation((url) => {
        console.log(url);
        expect(url).toBe("https://pokeapi.co/api/v2/pokemon?limit=151");
        return new Promise((resolve) => {
          resolve({
            json: () => Promise.resolve({ results: "lista de pokemones" }),
          });
        });
      });
      const { props } = await getStaticProps();
      expect(props.pokemones).toEqual("lista de pokemones");
    });
  });
});
