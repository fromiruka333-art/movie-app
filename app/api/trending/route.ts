import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TMDB API key not found in environment variables.' },
      { status: 500 }
    );
  }

  const url =
    process.env.TMDB_API_URL?.trim() ||
    'https://api.themoviedb.org/3/trending/movie/week?language=ja-JP';

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Failed to fetch data from TMDB.', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching TMDB data.', details: error?.message ?? null },
      { status: 500 }
    );
  }
}