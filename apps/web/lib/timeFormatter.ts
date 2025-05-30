export function formatDuration(seconds: number): string {
    const units = [
        { label: 'month', seconds: 30 * 24 * 60 * 60 }, // 30 days
        { label: 'day', seconds: 24 * 60 * 60 },
        { label: 'hour', seconds: 60 * 60 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    const parts: string[] = [];

    for (const unit of units) {
        const value = Math.floor(seconds / unit.seconds);
        if (value > 0) {
            parts.push(`${value} ${unit.label}${value !== 1 ? 's' : ''}`);
            seconds %= unit.seconds;
        }
    }

    if (parts.length === 0) return '0 seconds';

    return parts.join(' ');
}