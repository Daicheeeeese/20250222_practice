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
    partnerName: 'Taro Tanaka',
    status: 'pending'
  },
  {
    id: '2',
    articleTitle: 'The future of artificial intelligence in healthcare',
    scheduledDate: '2024-03-02 15:00',
    partnerName: 'Emma Kim',
    status: 'confirmed'
  },
  {
    id: '3',
    articleTitle: 'Space exploration: The next frontier',
    scheduledDate: '2024-02-28 13:00',
    partnerName: 'Sakura Suzuki',
    status: 'done'
  },
  {
    id: '4',
    articleTitle: 'The impact of social media on mental health',
    scheduledDate: '2024-02-29 16:00',
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

export default function ReservationsPage() {
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
              <div>
                パートナー: {reservation.partnerName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 