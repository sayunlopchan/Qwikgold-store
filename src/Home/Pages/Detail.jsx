import { LucideHeart } from "lucide-react";
import React from "react";

const Detail = () => {
  return (
    <>
      {/* top */}
      <section className="bg-linear-60 from-blue-500 to-blue-200">
        <div className="container max-sm:w-full w-[80%] lg:max-w-7xl mx-auto py-5 max-sm:px-2">
          <div className="flex my-10 text-white relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-10 w-full">
              {/* img */}
              <div className="md:col-span-3 flex justify-center md:block">
                <div className="bg-gray-500 size-23 lg:size-30 rounded-2xl mx-auto md:mx-0"></div>
              </div>
              {/* img */}

              {/* text */}
              <div className="md:col-span-6 space-y-2 text-center md:text-left">
                <h2 className="font-bold text-lg md:text-base">Game Title</h2>
                <div className="flex gap-3 lg:gap-10 text-sm justify-center md:justify-start">
                  <p>Global</p>
                  <p>Instant Delivery</p>
                </div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore libero rem doloribus! Quaerat alias dolores amet ex.
                  Et, numquam aliquam!
                </p>
              </div>
              {/* text */}

              {/* icon */}
              <div className="md:col-span-2 flex justify-center items-center">
                <LucideHeart className="w-6 h-6" />
              </div>
              {/* icon */}
            </div>
          </div>
        </div>
      </section>
      {/* top */}
      <section className="container max-sm:w-full w-[80%] lg:max-w-7xl mx-auto py-5 max-sm:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 9 cols */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-6 w-full shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-5 text-gray-800">
                Select Top-Up Amount
              </h2>

              {/* Map over main packs */}
              {mainPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-10 bg-linear-to-br ${pack.gradient} rounded-lg`}
                    ></div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {pack.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {pack.diamonds} + {pack.bonus} Bonus
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">
                      {pack.price}
                    </p>
                  </div>
                </div>
              ))}

              {/* Order Information */}
              <h4 className="text-lg font-bold mb-4 text-gray-800">
                Order Information
              </h4>
              <form className="space-y-4 mb-6">
                {/* Map over form fields */}
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm text-gray-600 mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={field.id}
                      placeholder={field.placeholder}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                ))}

                <p className="text-xs text-gray-500 mt-2">
                  Notes - Purchaseable 1 Time Every Week
                </p>
              </form>

              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Total</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    {total.price}
                  </p>
                  <p className="text-xs text-gray-500">{total.sku}</p>
                </div>
              </div>

              {/* Discounts */}
              <div className="mb-6">
                <h5 className="text-sm font-semibold mb-2 text-gray-800">
                  Discounts:
                </h5>
                <div className="space-y-1">
                  {discounts.map((discount, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      {discount}
                    </p>
                  ))}
                </div>
              </div>

              {/* Buy Now Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg mb-3 transition-all duration-300">
                {buttons.buyNow}
              </button>

              {/* PayPal Option */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                <span>{buttons.paypal}</span>
              </div>

              {/* Save for Future */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="save"
                  className="rounded border-gray-300"
                />
                <label htmlFor="save">{buttons.saveForFuture}</label>
              </div>
            </div>
          </div>

          {/* Right Column - 3 cols */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 sticky top-26 shadow-sm border border-gray-100">
              {/* Similar Packs Sidebar */}
              <h3 className="text-md font-bold mb-4 text-gray-800">
                Similar Packs
              </h3>

              {/* Map over similar packs */}
              {similarPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0"
                >
                  <div
                    className={`size-8 bg-linear-to-br ${pack.gradient} rounded-lg shrink-0`}
                  ></div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-800">
                      {pack.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {pack.diamonds} + {pack.bonus} Bonus
                    </p>
                  </div>
                  <p className="text-xs font-bold text-gray-800">
                    {pack.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;

// Add this data
const mainPacks = [
  {
    id: 1,
    name: "Weekly Elite Pack",
    gradient: "from-blue-500 to-purple-600",
    diamonds: "50 Diamonds",
    bonus: "5",
    price: "US$ 1.19",
  },
  {
    id: 2,
    name: "Monthly Elite Pack",
    gradient: "from-green-500 to-teal-600",
    diamonds: "150 Diamonds",
    bonus: "15",
    price: "US$ 5.86",
  },
];

const similarPacks = [
  {
    id: 1,
    name: "Weekly Elite Pack",
    gradient: "from-blue-500 to-purple-600",
    diamonds: "50 Diamonds",
    bonus: "5",
    price: "US$ 1.19",
  },
  {
    id: 2,
    name: "Monthly Elite Pack",
    gradient: "from-green-500 to-teal-600",
    diamonds: "150 Diamonds",
    bonus: "15",
    price: "US$ 5.86",
  },
  {
    id: 3,
    name: "Weekly Elite Pack",
    gradient: "from-blue-500 to-purple-600",
    diamonds: "50 Diamonds",
    bonus: "5",
    price: "US$ 1.19",
  },
  {
    id: 4,
    name: "Monthly Elite Pack",
    gradient: "from-green-500 to-teal-600",
    diamonds: "150 Diamonds",
    bonus: "15",
    price: "US$ 5.86",
  },
];

const formFields = [
  {
    id: "uid",
    label: "User ID",
    placeholder: "Phone or other User ID",
  },
  {
    id: "zid",
    label: "Zone ID",
    placeholder: "Phone center Zone ID",
  },
];

const discounts = [
  "20 Diamonds + 2 Bonus",
  "51 Diamonds + 5 Bonus",
  "78 Diamonds + 8 Bonus",
  "127 Diamonds + 13 Bonus",
  "202 Diamonds + 22 Bonus",
];

const total = {
  price: "US$ 0.99",
  sku: "SKU/Max Discounts 999+",
};

const buttons = {
  buyNow: "BUY NOW",
  paypal: "Buy with PayPal",
  saveForFuture: "Save for Future Purchases",
};
