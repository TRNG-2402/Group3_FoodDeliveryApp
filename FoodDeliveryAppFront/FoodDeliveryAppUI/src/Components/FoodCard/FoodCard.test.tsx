import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FoodCard } from "./FoodCard";
import type { IMenuItem } from "../../Interfaces/MenuItem";

describe("FoodCard", () => {
  const baseCart: IMenuItem[] = [];

  it("renders food item name, description, price, and image", () => {
    render(
      <FoodCard
        id={1}
        name="Burger"
        description="Cheeseburger with fries"
        price={9.99}
        imageURL="burger.png"
        quantity={0}
        cart={baseCart}
        setCart={vi.fn()}
      />
    );

    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Cheeseburger with fries")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();

    const image = screen.getByAltText("Burger");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "burger.png");
  });

  it("shows quantity from cart", () => {
    const cart: IMenuItem[] = [
      {
        menuItemId: 1,
        name: "Burger",
        description: "Cheeseburger with fries",
        price: 9.99,
        quantity: 3
      }
    ];

    render(
      <FoodCard
        id={1}
        name="Burger"
        description="Cheeseburger with fries"
        price={9.99}
        quantity={3}
        cart={cart}
        setCart={vi.fn()}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows 0 quantity when item is not in cart", () => {
    render(
      <FoodCard
        id={1}
        name="Burger"
        description="Cheeseburger with fries"
        price={9.99}
        quantity={0}
        cart={[]}
        setCart={vi.fn()}
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("calls setCart when increase button is clicked", async () => {
    const user = userEvent.setup();
    const setCart = vi.fn();

    render(
      <FoodCard
        id={1}
        name="Burger"
        description="Cheeseburger with fries"
        price={9.99}
        quantity={0}
        cart={[]}
        setCart={setCart}
      />
    );

    await user.click(screen.getByLabelText("Increase quantity"));

    expect(setCart).toHaveBeenCalled();
  });

  it("calls setCart when decrease button is clicked", async () => {
    const user = userEvent.setup();
    const setCart = vi.fn();

    const cart: IMenuItem[] = [
      {
        menuItemId: 1,
        name: "Burger",
        description: "Cheeseburger with fries",
        price: 9.99,
        quantity: 2
      }
    ];

    render(
      <FoodCard
        id={1}
        name="Burger"
        description="Cheeseburger with fries"
        price={9.99}
        quantity={2}
        cart={cart}
        setCart={setCart}
      />
    );

    await user.click(screen.getByLabelText("Decrease quantity"));

    expect(setCart).toHaveBeenCalled();
  });

  it("uses placeholder image when imageURL is missing", () => {
    render(
      <FoodCard
        id={1}
        name="Pizza"
        description="Cheese pizza"
        price={12.5}
        quantity={0}
        cart={[]}
        setCart={vi.fn()}
      />
    );

    const image = screen.getByAltText("Pizza");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });
});