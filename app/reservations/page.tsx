'use client'

import { useState } from 'react'
import { SpeakerWaveIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/20/solid'

type ReservationStatus = 'pending' | 'confirmed' | 'done' | 'cancelled';

type Reservation = {
  id: string;
  articleTitle: string;
  scheduledDate: string;
  partnerName: string;
  status: ReservationStatus;
};

const mockReservations: Reservation[] = [
  {
    id: '1',
    articleTitle: 'Climate change: How can we reduce our carbon footprint?',
    scheduledDate: '2024-03-01 14:00~14:15',
    partnerName: 'Taro Yamada',
    status: 'pending'
  },
  {
    id: '2',
    articleTitle: 'The future of artificial intelligence in healthcare',
    scheduledDate: '2024-03-02 15:00~15:15',
    partnerName: 'Emma Kim',
    status: 'confirmed'
  },
  {
    id: '3',
    articleTitle: 'Space exploration: The next frontier',
    scheduledDate: '2024-02-28 13:00~13:15',
    partnerName: 'Sakura Suzuki',
    status: 'done'
  },
  {
    id: '4',
    articleTitle: 'The impact of social media on mental health',
    scheduledDate: '2024-02-29 16:00~16:15',
    partnerName: 'Li Xuan',
    status: 'cancelled'
  }
];

const getStatusColor = (status: ReservationStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'done':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: ReservationStatus) => {
  switch (status) {
    case 'pending':
      return 'マッチング待ち';
    case 'confirmed':
      return '確定済み';
    case 'done':
      return '完了';
    case 'cancelled':
      return 'キャンセル';
    default:
      return status;
  }
};

type AIAdvice = {
  pronunciation: string[];
  grammar: string[];
  expression: string[];
}

const mockAIAdvice: Record<string, AIAdvice> = {
  '3': {  // done statusの予約ID
    pronunciation: [
      '"opportunity" の発音で第2音節のストレスが弱いです',
      '"technology" の "ch" の音がやや不明確です'
    ],
    grammar: [
      '仮定法過去の使用が適切でない箇所がありました',
      '関係代名詞の使い方を見直すと良いでしょう'
    ],
    expression: [
      'より自然な表現として "In my opinion" の代わりに "I believe" を使うと良いでしょう',
      'フォーマルな場面では "get" の代わりに "obtain" や "acquire" を使うことを検討してください'
    ]
  }
};

export default function ReservationsPage() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [showAdvice, setShowAdvice] = useState<string | null>(null);

  const handlePlayAudio = (reservationId: string) => {
    setIsPlaying(reservationId);
    setTimeout(() => setIsPlaying(null), 2000);
  };

  const buttonBaseStyle = "flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors text-sm whitespace-nowrap w-32 justify-center";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">予約一覧</h1>
      <div className="space-y-4">
        {mockReservations.map((reservation) => (
          <div 
            key={reservation.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {reservation.articleTitle}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                {getStatusText(reservation.status)}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                予定日時: {reservation.scheduledDate}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  パートナー: {reservation.partnerName}
                </div>
                {reservation.status === 'done' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAudio(reservation.id)}
                      className={`${buttonBaseStyle} ${
                        isPlaying === reservation.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <SpeakerWaveIcon className="w-5 h-5 flex-shrink-0" />
                      <span>録音を再生</span>
                    </button>
                    <button
                      onClick={() => setShowAdvice(reservation.id)}
                      className={`${buttonBaseStyle} bg-gray-100 text-gray-600 hover:bg-gray-200`}
                    >
                      <LightBulbIcon className="w-5 h-5 flex-shrink-0" />
                      <span>アドバイス</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AIアドバイスモーダル */}
      {showAdvice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">AI先生からのアドバイス</h3>
              <button
                onClick={() => setShowAdvice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">発音について</h4>
                <ul className="list-disc list-inside space-y-1">
                  {mockAIAdvice[showAdvice]?.pronunciation.map((advice, index) => (
                    <li key={index} className="text-gray-700">{advice}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2">文法について</h4>
                <ul className="list-disc list-inside space-y-1">
                  {mockAIAdvice[showAdvice]?.grammar.map((advice, index) => (
                    <li key={index} className="text-gray-700">{advice}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-2">表現について</h4>
                <ul className="list-disc list-inside space-y-1">
                  {mockAIAdvice[showAdvice]?.expression.map((advice, index) => (
                    <li key={index} className="text-gray-700">{advice}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 