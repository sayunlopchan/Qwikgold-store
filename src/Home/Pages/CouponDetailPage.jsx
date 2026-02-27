import React from "react";
import {
  Gift,
  Clock,
  Users,
  Shield,
  AlertCircle,
  Tag,
  Copy,
} from "lucide-react";

const CouponDetailPage = () => {
  // Static data based on the image
  const couponData = {
    discount: "15% OFF",
    title: "Age of Empires Mobile Top Up 15% Discount Coupon",
    description:
      "Age of Empires Mobile Top Up 15% Discount Coupon Maximum discount amount: 300 Qwikgold Credits",
    validDate: "2026/02/01 00:00 - 2026/02/28 23:59 (GMT+8)",
    usedPercent: 9,
    maxDiscount: "300 Qwikgold Credits",
    code: "ACF EMPIRE GLOBAL",
    terms: [
      "This coupon is valid from 1st February, 2026 (00:00 GMT+8) and will end on 28th February 2026 (23:59 GMT+8).",
      "The coupon offers 15% OFF capped at 300 Qwikgold Credits with no minimum spend. The promotion is valid for all payment channels available on Qwikgold.",
      "Each user is allowed to claim only ONE (1) coupon throughout the campaign. Multiple claims or attempts to claim more than one coupon are strictly prohibited.",
      "Coupons are issued on a first-come, first-served basis and can be claimed until the total quota is reached. Once the coupon quota has been fully utilized, the promotion will end, regardless of the scheduled end date.",
      "Coupons must be redeemed during the promotional period. Expired or unused coupons will not be reissued or extended under any circumstances.",
      "Agents, employees, and their friends or family are not eligible to participate in this promotion campaign.",
      "Qwikgold reserves the right to cancel or modify any order, or revoke the use of coupons for any reason.",
      "Qwikgold will not be liable and/or be required to offer replacement coupon for: Discontinued or canceled coupon. Improper use of, or inability to redeem a coupon. The inability to redeem a coupon due to technical issues.",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 md:p-6 font-sans">
      {/* Main container: minimalist grid layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SECTION: Coupon overview - minimalist card */}
        <div className="md:col-span-1 md:sticky md:top-6 h-fit">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header - minimalist gradient */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
              <div className="text-5xl font-light mb-3 tracking-tight">
                {couponData.discount}
              </div>
              <div className="text-sm text-gray-300 font-light leading-relaxed">
                {couponData.title}
              </div>
            </div>

            {/* Content - clean spacing */}
            <div className="p-5 space-y-5">
              {/* Claim button - minimal */}
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-sm tracking-wide">
                Claim Coupon
              </button>

              {/* Info items - minimalist */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-gray-500 text-xs">Valid until</div>
                    <p className="text-gray-800 text-sm">
                      {couponData.validDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-500 text-xs">Usage</span>
                      <span className="text-gray-700 text-xs">
                        {couponData.usedPercent}% used
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1">
                      <div
                        className="bg-gray-800 h-1 rounded-full"
                        style={{ width: `${couponData.usedPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Max discount - simple card */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Max discount</div>
                <div className="text-lg font-medium text-gray-900">
                  {couponData.maxDiscount}
                </div>
              </div>

              {/* Note - minimal */}
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3" />
                First-come, first-served basis
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Details - minimalist */}
        <div className="md:col-span-2 space-y-5">
          {/* Description - clean card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-gray-700 text-sm leading-relaxed flex items-start gap-2">
              <Gift className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <span>{couponData.description}</span>
            </p>
          </div>

          {/* Coupon code - minimalist */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Coupon code</div>
                <div className="font-mono text-xl tracking-wider text-gray-900">
                  {couponData.code}
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition self-start sm:self-auto">
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
            </div>
          </div>

          {/* Info cards - minimal grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 mb-1">Minimum spend</div>
              <div className="font-medium text-gray-800">None</div>
              <div className="text-xs text-gray-500 mt-1">
                Valid for all payment channels
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-400 mb-1">Per user</div>
              <div className="font-medium text-gray-800">One coupon</div>
              <div className="text-xs text-gray-500 mt-1">
                Multiple claims prohibited
              </div>
            </div>
          </div>

          {/* Terms - clean list */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-gray-400" />
              <h3 className="font-medium text-gray-700 text-sm">
                Terms & conditions
              </h3>
            </div>
            <div className="space-y-3">
              {couponData.terms.map((term, index) => (
                <div
                  key={index}
                  className="flex gap-2 text-xs text-gray-600 leading-relaxed"
                >
                  <span className="text-gray-300 font-medium">
                    {index + 1}.
                  </span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Note - subtle */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-2 text-xs text-gray-500">
            <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
            <span>
              Agents, employees, and their friends or family are not eligible.
              Qwikgold reserves the right to cancel or modify orders.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;
