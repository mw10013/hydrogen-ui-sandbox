import { useCart, useCartLine } from "@shopify/hydrogen-react";
import type { BaseButtonProps } from "@shopify/hydrogen-react/dist/types/BaseButton";
import { BaseButton } from "@/components/BaseButton";
import React, { useCallback } from "react";

interface CartLineQuantityAdjustButtonProps {
  /** The adjustment for a cart line's quantity. Valid values: `increase` (default), `decrease`, or `remove`. */
  adjust?: "increase" | "decrease" | "remove";
}

/**
 * The `CartLineQuantityAdjustButton` component renders a button that adjusts the cart line's quantity when pressed.
 * It must be a descendent of a `CartLineProvider` component.
 */
export function CartLineQuantityAdjustButton<
  AsType extends React.ElementType = "button"
>(props: CartLineQuantityAdjustButtonProps & BaseButtonProps<AsType>) {
  const { status, linesRemove, linesUpdate } = useCart();
  const cartLine = useCartLine();
  const { children, adjust, onClick, ...passthroughProps } = props;

  const handleAdjust = useCallback(() => {
    if (adjust === "remove") {
      linesRemove([cartLine.id]);
      return;
    }

    const quantity =
      adjust === "decrease" ? cartLine.quantity - 1 : cartLine.quantity + 1;

    if (quantity <= 0) {
      linesRemove([cartLine.id]);
      return;
    }

    linesUpdate([{ id: cartLine.id, quantity }]);
  }, [adjust, cartLine.id, cartLine.quantity, linesRemove, linesUpdate]);

  return (
    <BaseButton
      disabled={status !== "idle"}
      onClick={onClick}
      defaultOnClick={handleAdjust}
      {...passthroughProps}
    >
      {children}
    </BaseButton>
  );
}
