'use client'

import { useState } from 'react'
import { SpeakerWaveIcon } from '@heroicons/react/20/solid'

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
    scheduledDate: '2024-03-01 14:00',
    partnerName: 'Emily Thompson',
    status: 'pending'
  },
  {
    id: '2',
    articleTitle: 'The future of artificial intelligence in healthcare',
    scheduledDate: '2024-03-02 15:00',
    partnerName: 'Michael Chen',
    status: 'confirmed'
  },
  {
    id: '3',
    articleTitle: 'Space exploration: The next frontier',
    scheduledDate: '2024-02-28 13:00',
    partnerName: 'Sarah Johnson',
    status: 'done'
  },
  {
    id: '4',
    articleTitle: 'The impact of social media on mental health',
    scheduledDate: '2024-02-29 16:00',
    partnerName: 'David Wilson',
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

export default function ReservationsPage() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlayAudio = (reservationId: string) => {
    // 将来的に実際の音声再生機能を実装
    setIsPlaying(reservationId);
    setTimeout(() => setIsPlaying(null), 2000); // 仮の再生完了タイミング
  };

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
                  <button
                    onClick={() => handlePlayAudio(reservation.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
                      isPlaying === reservation.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <SpeakerWaveIcon className="w-5 h-5" />
                    <span>録音を再生</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 