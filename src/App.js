import React, { useState } from 'react';

const App = () => {
  // State for form data
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    mooncakeQuantities: {
      mochaHazelnut: 0,
      pistachioCheese: 0,
      yamCoconut: 0,
      berriesYogurt: 0,
      redBean: 0,
      mixedNuts: 0,
      whiteLotusSingleYolk: 0,
      pandanLotusSingleYolk: 0,
      jellyMooncakeSet: 0,
      'Snowskin Set': 0, // Added initial state for new sets
      'Traditional Set': 0, // Added initial state for new sets
    },
    pickupBatch: '',
    deliveryOption: 'selfPickup', // 'selfPickup' or 'delivery'
    isGift: false,
    recipientName: '',
    recipientMobile: '',
    deliveryAddress: '',
    giftMessage: '',
    additionalNotes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Mooncake flavor definitions
  const mooncakeFlavors = {
    snowSkin: [
      { id: 'mochaHazelnut', name: 'Mocha Hazelnut', nameZh: '摩卡榛果' },
      { id: 'pistachioCheese', name: 'Pistachio Cheese', nameZh: '开心果芝士' },
      { id: 'yamCoconut', name: 'Yam Coconut', nameZh: '椰香芋泥' },
      { id: 'berriesYogurt', name: 'Berries Yogurt', nameZh: '莓果酸奶' },
      { id: 'Snowskin Set', name: 'Set， 4 flavours', nameZh: '套装 4个口味' },
    ],
    traditional: [
      { id: 'redBean', name: 'Red Bean', nameZh: '红豆' },
      { id: 'mixedNuts', name: 'Mixed Nuts', nameZh: '伍仁' },
      { id: 'whiteLotusSingleYolk', name: 'White Lotus Single YM', nameZh: '白莲单黄' },
      { id: 'pandanLotusSingleYolk', name: 'Pandan Lotus Single Yolk', nameZh: '翡翠莲蓉单黄' }, // Corrected name consistency
      { id: 'Traditional Set', name: 'Traditional Set', nameZh: '传统套装 4个口味' },
    ],
    jelly: [
      { id: 'jellyMooncakeSet', name: 'Jelly Mooncake Set', nameZh: '果冻月饼礼盒' },
    ],
  };

  // Pickup batch dates
  const pickupBatches = [
    { date: '13 Sept 2025', dateZh: '2025年9月13日 (第一批)' },
    { date: '20 Sept 2025', dateZh: '2025年9月20日 (第二批)' },
    { date: '27 Sept 2025', dateZh: '2025年9月27日 (第三批)' },
    { date: '04 Oct 2025', dateZh: '2025年10月4日 (第四批)' },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle mooncake quantity changes
  const handleMooncakeQuantityChange = (flavorId, value) => {
    const parsedValue = parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      mooncakeQuantities: {
        ...prev.mooncakeQuantities,
        [flavorId]: isNaN(parsedValue) ? 0 : parsedValue, // Ensure it's a number
      },
    }));
  };

  // Show modal message
  const showModal = (message) => {
    setModalMessage(message);
    setShowSubmissionModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowSubmissionModal(false);
    setModalMessage('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.customerName || !formData.customerMobile || !formData.pickupBatch) {
      showModal('请填写所有必填信息。| Please fill in all required information.');
      return;
    }

    const totalMooncakes = Object.values(formData.mooncakeQuantities).reduce((acc, curr) => acc + curr, 0);
    if (totalMooncakes === 0) {
      showModal('请选择您要订购的月饼数量。| Please select the quantity of mooncakes you wish to order.');
      return;
    }

    if (formData.deliveryOption === 'delivery' && !formData.recipientName && formData.isGift) { // Added isGift check
      showModal('请填写收件人姓名。| Please provide the recipient\'s name for delivery.');
      return;
    }


    // In a real application, you would send this data to a backend server.
    // For this example, we'll log it to the console and display a success message.
    console.log('Form Data Submitted:', formData);
    setFormSubmitted(true);
    showModal('您的订单已成功提交！感谢您的预购。| Your order has been submitted successfully! Thank you for your pre-order.');
    // Optionally reset form after submission
    // setFormData({ ...initialState });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100 p-4 font-sans flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-3xl border-4 border-amber-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 text-center mb-6">
          双丽月饼预购单 <br /> Jelisz Mooncake Order Form
        </h1>
        <p className="text-gray-700 text-center mb-8 text-sm md:text-base">
          感谢您对我们手工制作月饼的支持！请填写以下表格进行预购。请注意，我们是住家式烘培，所有月饼都是新鲜制作，且数量有限。如有任何疑问，请联系我们：
          <a href="tel:0168502845" className="text-amber-600 hover:underline">Jess 0168502845</a> 或
          <a href="tel:0168741586" className="text-amber-600 hover:underline"> Liz 0168741586</a>。
          <br /><br />
          Thank you for supporting our homemade mooncakes! Please fill out the form below to place your order. As a home-based bakery, all our mooncakes are freshly made, and quantities are limited. If you have any questions, please contact us at
          <a href="tel:0168502845" className="text-amber-600 hover:underline"> Jess 0168502845</a> or
          <a href="tel:0168741586" className="text-amber-600 hover:underline"> Liz 0168741586</a>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="p-5 bg-amber-50 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
              顾客信息 | Customer Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-gray-800 font-semibold mb-2">
                  您的姓名 <span className="text-red-500">*</span> | Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="customerMobile" className="block text-gray-800 font-semibold mb-2">
                  您的手机号码 <span className="text-red-500">*</span> | Your Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customerMobile"
                  name="customerMobile"
                  value={formData.customerMobile}
                  onChange={handleChange}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  pattern="[0-9]{8,15}" // Basic phone number pattern
                  title="请输入有效的手机号码 (8-15位数字) | Please enter a valid mobile number (8-15 digits)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Mooncake Selection */}
          <div className="p-5 bg-amber-50 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
              选择您的月饼 | Choose Your Mooncakes
            </h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              请选择您想预订的月饼口味和数量。每盒通常有4个。| Please select the flavors and quantity you would like to order. A box usually contains 4 pieces.
            </p>

            {/* Snow Skin Series */}
            <h3 className="text-lg md:text-xl font-semibold text-amber-600 mb-3">
              a. 冰皮月饼系列 (Snow Skin Series)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mooncakeFlavors.snowSkin.map((flavor) => (
                <div key={flavor.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-amber-200">
                  <span className="text-gray-700">{flavor.nameZh} ({flavor.name})</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.mooncakeQuantities[flavor.id]}
                    onChange={(e) => handleMooncakeQuantityChange(flavor.id, e.target.value)}
                    className="w-20 p-2 border border-amber-300 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>

            {/* Traditional Series */}
            <h3 className="text-lg md:text-xl font-semibold text-amber-600 mb-3">
              b. 传统烘皮月饼系列 (Traditional Baked Series)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mooncakeFlavors.traditional.map((flavor) => (
                <div key={flavor.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-amber-200">
                  <span className="text-gray-700">{flavor.nameZh} ({flavor.name})</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.mooncakeQuantities[flavor.id]}
                    onChange={(e) => handleMooncakeQuantityChange(flavor.id, e.target.value)}
                    className="w-20 p-2 border border-amber-300 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>

            {/* Jelly Series */}
            <h3 className="text-lg md:text-xl font-semibold text-amber-600 mb-3">
              c. 果冻月饼礼盒 (Jelly Mooncake Set)
            </h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              备注：每套包含4个不同口味（芒果西米、芋头红豆、香兰玉米、椰糖马蹄）。| Note: Each set contains 4 different flavors (Mango Sago, Yam Red Bean, Pandan Sweet Corn, Gula Melaka Water Chestnut).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mooncakeFlavors.jelly.map((flavor) => (
                <div key={flavor.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-amber-200">
                  <span className="text-gray-700">{flavor.nameZh} ({flavor.name})</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.mooncakeQuantities[flavor.id]}
                    onChange={(e) => handleMooncakeQuantityChange(flavor.id, e.target.value)}
                    className="w-20 p-2 border border-amber-300 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Pickup */}
          <div className="p-5 bg-amber-50 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
              配送与取货 | Pickup & Delivery
            </h2>
            <div className="mb-4">
              <label htmlFor="pickupBatch" className="block text-gray-800 font-semibold mb-2">
                请选择您的月饼取货或配送批次。<span className="text-red-500">*</span> | Please select your preferred batch for pickup or delivery. <span className="text-red-500">*</span>
              </label>
              <select
                id="pickupBatch"
                name="pickupBatch"
                value={formData.pickupBatch}
                onChange={handleChange}
                className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                required
              >
                <option value="">-- 请选择 -- | -- Please select --</option>
                {pickupBatches.map((batch) => (
                  <option key={batch.date} value={batch.date}>
                    {batch.dateZh} ({batch.date})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                您希望如何接收您的订单？<span className="text-red-500">*</span> | How would you like to receive your order? <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="selfPickup"
                    checked={formData.deliveryOption === 'selfPickup'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-amber-600"
                  />
                  <span className="ml-2 text-gray-700">上门自取 (Self-Pickup)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="delivery"
                    checked={formData.deliveryOption === 'delivery'}
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-amber-600"
                  />
                  <span className="ml-2 text-gray-700">配送服务 (Delivery Service)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Gifting Information (Conditional) */}
          {formData.deliveryOption === 'delivery' && (
            <div className="p-5 bg-amber-50 rounded-lg shadow-inner">
              <h2 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
                送礼信息 (如适用) | Gifting Information (If applicable)
              </h2>
              <div className="mb-4">
                <label className="block text-gray-800 font-semibold mb-2">
                  此订单是否作为礼物送给他人？ | Is this order a gift for someone else?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isGift"
                      value="true"
                      checked={formData.isGift === true}
                      onChange={() => setFormData({ ...formData, isGift: true })}
                      className="form-radio h-5 w-5 text-amber-600"
                    />
                    <span className="ml-2 text-gray-700">是 (Yes)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isGift"
                      value="false"
                      checked={formData.isGift === false}
                      onChange={() => setFormData({ ...formData, isGift: false })}
                      className="form-radio h-5 w-5 text-amber-600"
                    />
                    <span className="ml-2 text-gray-700">否 (No)</span>
                  </label>
                </div>
              </div>

              {formData.isGift && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recipientName" className="block text-gray-800 font-semibold mb-2">
                      收件人姓名 <span className="text-red-500">*</span> | Recipient's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required={formData.deliveryOption === 'delivery' && formData.isGift} // Required only if gift and delivery
                    />
                  </div>
                  <div>
                    <label htmlFor="recipientMobile" className="block text-gray-800 font-semibold mb-2">
                      收件人联系号码 (最好是WhatsApp) | Recipient's Contact Number (WhatsApp preferred)
                    </label>
                    <input
                      type="tel"
                      id="recipientMobile"
                      name="recipientMobile"
                      value={formData.recipientMobile}
                      onChange={handleChange}
                      className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      pattern="[0-9]{8,15}"
                      title="请输入有效的手机号码 (8-15位数字) | Please enter a valid mobile number (8-15 digits)"
                    />
                  </div>
                  <div>
                    <label htmlFor="deliveryAddress" className="block text-gray-800 font-semibold mb-2">
                      送货地址 <span className="text-red-500">*</span> | Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="deliveryAddress"
                      name="deliveryAddress"
                      rows="3"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required={formData.deliveryOption === 'delivery'}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="giftMessage" className="block text-gray-800 font-semibold mb-2">
                      您想为收件人写一句祝福语吗？ (可选) | Would you like to include a personalized message for the recipient? (Optional)
                    </label>
                    <textarea
                      id="giftMessage"
                      name="giftMessage"
                      rows="2"
                      value={formData.giftMessage}
                      onChange={handleChange}
                      className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional Notes */}
          <div className="p-5 bg-amber-50 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
              额外备注 | Additional Notes
            </h2>
            <div>
              <label htmlFor="additionalNotes" className="block text-gray-800 font-semibold mb-2">
                任何其他备注或特别要求？ (例如：对某些食材过敏等) | Any other notes or special requests? (e.g., food allergies, etc.)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="3"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
          >
            提交订单 | Submit Order
          </button>
        </form>

        {/* Submission Confirmation Modal */}
        {showSubmissionModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl border-t-4 border-amber-500">
              <h3 className="text-xl font-bold text-amber-700 mb-4">
                {formSubmitted ? '订单已提交！' : '提示'} | {formSubmitted ? 'Order Submitted!' : 'Notice'}
              </h3>
              <p className="text-gray-800 mb-6 text-center">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                好的 | OK
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default App;
Add src/App.js
