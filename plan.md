Project context
- Build a swimwear storefront called Kelly Swimwear
- Use Next.js + React + Tailwind
- Start with mock product data on the client
- Keep the app structured so the UI can later be swapped to a component library without rewriting the app

Core product goals
- Premium, clean ecommerce visual style
- Luxury beachwear aesthetic
- Mobile-first and responsive design
- Ready for future backend/CMS integration
- Front-end demo checkout only for now

Page structure

1. Main / Home page
- Floating transparent header over a full-width hero background image
- Popular items section with horizontal scrolling cards for 8 products
- Category grid with a 4x4-style layout
  - Tops
  - Bottoms
  - Dresses
  - One-pieces
- Each category card includes background image + category label
- CTA buttons and product discovery flow

2. Product detail page
- Layout:
  - Right side: large product image gallery
  - Hover mouse movement reveals zoom box / magnifier effect
- Left side:
  - Product name
  - Product price
  - Color selector
  - Size selector
  - Add to cart button
  - Accordion sections:
    - Description
    - Details (fabric composition, e.g. Nylon 80% / Elastane 20%)
    - Model size & fit
    - Shipping & returns
- Support alternate color/image variants

3. Cart drawer / cart page interaction
- Slide-out cart drawer from the side
- Closeable with overlay
- Display shipping threshold for free shipping
- List of chosen items
  - Left: product image
  - Right: product name, size, color, price, quantity
  - Remove button
- Subtotal and cart summary section
- Checkout button that routes to the checkout page

4. Checkout page
- Left side: customer details form
  - email
  - first name
  - last name
  - address
  - apartment
  - zip code
  - city
  - phone number
- Right side: order summary
  - items in cart
  - subtotal
  - shipping
  - total
- Front-end validation only
- No real payment integration yet

Data model
- Product data structure:
  - id
  - name
  - category
  - price
  - colors
  - sizes
  - description
  - details
  - fit notes
  - image urls
  - featured flag
- Store mock catalog in a single data source first, then migrate to server/API later

Cart logic
- Add products to cart from product page
- Use Redux Toolkit as the app-wide state-management solution
- Add `@reduxjs/toolkit` and `react-redux`
- Configure a Redux store with a cart slice and expose it through a client-side StoreProvider mounted in the Next.js App Router layout
- Use typed dispatch and selector hooks from the shared store setup
- Keep only cart data in global state: cart lines contain product id, selected color, selected size, and quantity; derive product details and totals from the catalog
- Treat the same product in different colors or sizes as separate cart lines
- Support add-to-cart, quantity updates, and item removal through cart-slice reducers
- Persist cart lines to localStorage and restore them on the client; avoid accessing browser storage during server rendering
- Derive subtotal, shipping, free-shipping progress, and total with selectors and a configurable shipping threshold rather than storing duplicate calculated values
- Keep transient UI state (open drawer, selected image, accordion state) local to the relevant component
- Keep checkout form values local to the checkout flow; no account or server-side state is needed for the demo
- Keep product catalog data separate from cart state so it can later be fetched from a server/API

Component strategy
- No full component library at the start
- Keep components reusable and organized by role
- Structure them so they can be swapped later with a design system

Recommended folder structure
- components/
  - ui/
    - Button.tsx
    - Input.tsx
    - Select.tsx
    - Accordion.tsx
    - Modal.tsx
    - ProductCard.tsx
    - QuantityStepper.tsx
  - home/
    - HeroHeader.tsx
    - PopularProducts.tsx
    - CategoryGrid.tsx
  - product/
    - ProductGallery.tsx
    - ProductInfo.tsx
    - ProductColorSelector.tsx
    - ProductSizeSelector.tsx
    - ProductZoom.tsx
  - cart/
    - CartDrawer.tsx
    - CartItem.tsx
  - checkout/
    - CheckoutForm.tsx
    - OrderSummary.tsx
- lib/
  - data/
    - products.ts
  - store/
    - store.ts
    - hooks.ts
    - StoreProvider.tsx
    - features/
      - cart/
        - cartSlice.ts
        - cartSelectors.ts
        - cartStorage.ts
- app/
  - page.tsx
  - product/[slug]/page.tsx
  - checkout/page.tsx

Implementation order
1. Scaffold Next.js app and configure Tailwind
2. Add Redux Toolkit and React Redux; create the store, typed hooks, and client-side StoreProvider
3. Create mock product catalog and data model
4. Build the home page and category cards
5. Build the product detail page with image zoom interaction
6. Implement the cart slice, selectors, localStorage persistence, and cart drawer UI
7. Build checkout form and summary panel
8. Add responsive refinement and UX polish

Notes
- This is a storefront demo, not a full commerce backend
- Imagery can be supplied later and plugged into the same product data model
- Brand styling and reusable components should stay consistent so future upgrades are easy
