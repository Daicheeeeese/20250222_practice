'use client'

import { useState } from 'react'

export function DiscussionRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0') + ':00'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // ここで実際のAPI呼び出しを行う
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        この記事についてディスカッションする
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            {!isSubmitted ? (
              <>
                <h2 className="text-xl font-bold mb-4">ディスカッション希望時間</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      希望時間を選択してください
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">選択してください</option>
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      disabled={!selectedTime}
                    >
                      申し込む
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-lg font-medium text-gray-700 mb-4">
                  申し込みを受け付けました。<br />
                  マッチングされるまでお待ちください。
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setIsSubmitted(false)
                    setSelectedTime('')
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                >
                  閉じる
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 