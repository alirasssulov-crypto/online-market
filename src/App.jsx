
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Retro Runner",
    category: "Кроссовки",
    price: 95,
    oldPrice: 120,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    color: "#f3e9df",
  },
  {
    id: 2,
    name: "Essential Hoodie",
    category: "Одежда",
    price: 78,
    oldPrice: null,
    badge: "NEW DROP",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    color: "#e9e6e1",
  },
  {
    id: 3,
    name: "Urban Classic",
    category: "Кроссовки",
    price: 110,
    oldPrice: null,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    color: "#e8e5dc",
  },
  {
    id: 4,
    name: "Everyday Bag",
    category: "Аксессуары",
    price: 64,
    oldPrice: 80,
    badge: "-20%",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    color: "#eee5dc",
  },
  {
    id: 5,
    name: "Minimal Watch",
    category: "Аксессуары",
    price: 89,
    oldPrice: null,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    color: "#e7e6e2",
  },
  {
    id: 6,
    name: "Streetwear Set",
    category: "Одежда",
    price: 135,
    oldPrice: 160,
    badge: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    color: "#e8e2dc",
  },
];

const categories = ["Все", "Кроссовки", "Одежда", "Аксессуары"];

const money = (price) => `$${price.toFixed(2)}`;

function ProductCard({ product, addToCart, favorite, toggleFavorite }) {
  return (
    <article className="product-card group">
      <div
        className="product-image"
        style={{ backgroundColor: product.color }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          type="button"
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label="Добавить в избранное"
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          className="quick-add"
          onClick={() => addToCart(product)}
        >
          <Plus size={18} />
          Добавить
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <div className="product-bottom">
          <h3>{product.name}</h3>
          <div className="product-prices">
            {product.oldPrice && (
              <span className="old-price">{money(product.oldPrice)}</span>
            )}
            <span className="product-price">{money(product.price)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [category, setCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        category === "Все" || product.category === category;
      const searchMatch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return categoryMatch && searchMatch;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      return existing
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...current, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} добавлен в корзину`);
    setCartOpen(true);
  }

  function updateQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="store">
      <div className="announcement">
        FREE SHIPPING ON ORDERS OVER $150
        <span> — </span>
        NEW SEASON / 2026
      </div>

      <header className="navbar">
        <a href="#home" className="brand" aria-label="FORME — главная">
          FORME<span>.</span>
        </a>

        <nav className={`nav-links ${mobileOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMobileOpen(false)}>Главная</a>
          <a href="#shop" onClick={() => setMobileOpen(false)}>Каталог</a>
          <a href="#story" onClick={() => setMobileOpen(false)}>О бренде</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button search-toggle"
            aria-label="Поиск"
            onClick={() => {
              document.getElementById("shop")?.scrollIntoView({
                behavior: "smooth",
              });
              setTimeout(() => document.getElementById("product-search")?.focus(), 350);
            }}
          >
            <Search size={20} />
          </button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span>Корзина</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="icon-button mobile-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-photo"
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90"
            alt="Современный городской streetwear стиль"
            fetchPriority="high"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">
              THE NEW COLLECTION — 2026
            </span>

            <h1>
              Less noise.
              <br />
              <span>More style.</span>
            </h1>

            <p>
              Вещи, которые говорят за тебя.
              <br />
              Современная классика на каждый день.
            </p>

            <a href="#shop" className="primary-button">
              Открыть коллекцию <ArrowUpRight size={18} />
            </a>

            <div className="hero-index">
              <span>01</span>
              <span className="index-line" />
              <span>03 — NEW ERA</span>
            </div>
          </div>

          <a href="#shop" className="scroll-indicator">
            SCROLL TO EXPLORE <ArrowDownRight size={16} />
          </a>
        </section>

        <section className="ticker" aria-label="Наш стиль">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>
                EVERYDAY ESSENTIALS <i>✳</i> BUILT FOR YOUR OWN WAY <i>✳</i>
              </span>
            ))}
          </div>
        </section>

        <section id="shop" className="shop-section section-shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>New arrivals<span>.</span></h2>
              <p className="section-description">
                Меньше вещей. Больше характера.
              </p>
            </div>

            <p className="results-count">
              {visibleProducts.length.toString().padStart(2, "0")} PRODUCTS
            </p>
          </div>

          <div className="shop-toolbar">
            <div className="category-tabs">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={category === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="shop-controls">
              <label className="search-field">
                <Search size={17} />
                <input
                  id="product-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Поиск товаров"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Очистить поиск"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>

              <label className="sort-field">
                <SlidersHorizontal size={16} />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Сортировать товары"
                >
                  <option value="featured">Рекомендуемые</option>
                  <option value="low">Сначала дешевле</option>
                  <option value="high">Сначала дороже</option>
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="reveal"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    favorite={favorites.includes(product.id)}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={30} />
              <h3>Ничего не найдено</h3>
              <p>Попробуй другое название или категорию.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("Все");
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          <div className="view-all">
            <span>FIND YOUR EVERYDAY UNIFORM.</span>
            <a href="#story">Найди свой стиль <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="editorial" id="story">
          <div className="editorial-image">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
              alt="Минималистичный образ современной моды"
              loading="lazy"
            />
            <span className="editorial-stamp">FORME / EST. 2026</span>
          </div>

          <div className="editorial-copy">
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <h2>
              Style is
              <br />
              personal<span>.</span>
            </h2>
            <p>
              Мы верим, что хороший стиль не требует лишних слов.
              Чистые силуэты, продуманные детали и свобода быть собой.
            </p>
            <a href="#shop" className="text-link">
              Открыть каталог <ArrowUpRight size={18} />
            </a>

            <div className="editorial-number">F / 001</div>
          </div>
        </section>

        <section className="benefits">
          <div>
            <span className="benefit-number">01 /</span>
            <h3>Carefully selected</h3>
            <p>Коллекция без лишнего — только вещи со своим характером.</p>
          </div>
          <div>
            <span className="benefit-number">02 /</span>
            <h3>Made to combine</h3>
            <p>Легко сочетать. Просто носить. Удобно каждый день.</p>
          </div>
          <div>
            <span className="benefit-number">03 /</span>
            <h3>Your own rules</h3>
            <p>Не следуй стилю. Создавай свой.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">FORME<span>.</span></a>
        <p>LESS NOISE. MORE STYLE.</p>
        <a href="#home" className="back-top">НАВЕРХ ↑</a>
        <span className="copyright">© 2026 FORME STUDIO</span>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>Корзина <span>({cartCount})</span></h2>
              </div>
              <button
                className="icon-button"
                onClick={() => {
                  setCartOpen(false);
                  setMessage("");
                }}
                aria-label="Закрыть корзину"
              >
                <X size={22} />
              </button>
            </div>

            {message && (
              <div className="cart-message">
                <Check size={16} /> {message}
                <button onClick={() => setMessage("")} aria-label="Закрыть">
                  <X size={15} />
                </button>
              </div>
            )}

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={38} />
                  <h3>Пока здесь пусто</h3>
                  <p>Добавь что-нибудь из новой коллекции.</p>
                  <button
                    className="primary-button"
                    onClick={() => setCartOpen(false)}
                  >
                    Продолжить покупки
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <p>{item.category}</p>
                      <h3>{item.name}</h3>
                      <strong>{money(item.price)}</strong>
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Уменьшить количество"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Увеличить количество"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          className="remove-item"
                          onClick={() =>
                            setCart((current) =>
                              current.filter((product) => product.id !== item.id)
                            )
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-bottom">
                <div className="subtotal">
                  <span>Итого</span>
                  <strong>{money(total)}</strong>
                </div>
                <button
                  className="checkout-button"
                  onClick={() =>
                    setMessage("Это демо-магазин. Для реального заказа нужен backend.")
                  }
                >
                  Перейти к оформлению <ArrowUpRight size={18} />
                </button>
                <p>Стоимость доставки рассчитывается отдельно.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
