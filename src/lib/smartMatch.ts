// Smart Match Algorithm for Agency Recommendations

interface Agency {
    id: string;
    name: string;
    location: string;
    eventTypes: string[];
    budgetRange: { min: number; max: number };
    rating: number;
    reviewCount: number;
}

interface UserPreferences {
    eventType: string;
    location: string;
    budget: number;
}

/**
 * Calculate Smart Match score for an agency based on user preferences
 * Score breakdown:
 * - Event Type Match: 40%
 * - Location Match: 30%
 * - Budget Compatibility: 20%
 * - Rating & Reviews: 10%
 */
export function calculateSmartMatchScore(
    agency: Agency,
    preferences: UserPreferences
): number {
    let score = 0;

    // Event Type Match (40 points)
    const eventTypeMatch = agency.eventTypes.some(
        (type) => type.toLowerCase() === preferences.eventType.toLowerCase()
    );
    score += eventTypeMatch ? 40 : 0;

    // Location Match (30 points)
    // Simple string matching - in production, use geolocation
    const locationMatch = agency.location
        .toLowerCase()
        .includes(preferences.location.toLowerCase());
    score += locationMatch ? 30 : 15; // Partial credit for nearby locations

    // Budget Compatibility (20 points)
    const budgetFits =
        preferences.budget >= agency.budgetRange.min &&
        preferences.budget <= agency.budgetRange.max;
    const budgetClose =
        preferences.budget >= agency.budgetRange.min * 0.8 &&
        preferences.budget <= agency.budgetRange.max * 1.2;

    if (budgetFits) {
        score += 20;
    } else if (budgetClose) {
        score += 10;
    }

    // Rating & Reviews (10 points)
    const ratingScore = (agency.rating / 5) * 8; // Max 8 points for rating
    const reviewScore = Math.min(agency.reviewCount / 50, 1) * 2; // Max 2 points for reviews
    score += ratingScore + reviewScore;

    return Math.round(score);
}

/**
 * Sort agencies by Smart Match score
 */
export function rankAgenciesByMatch(
    agencies: Agency[],
    preferences: UserPreferences
): Array<Agency & { smartMatchScore: number }> {
    return agencies
        .map((agency) => ({
            ...agency,
            smartMatchScore: calculateSmartMatchScore(agency, preferences),
        }))
        .sort((a, b) => b.smartMatchScore - a.smartMatchScore);
}
