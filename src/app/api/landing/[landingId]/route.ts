import LandingPage from '&common/LandingPage';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ landingId: string }> }) {
	
	const landingId = (await params).landingId;

	try {
		const data = await LandingPage.findOne({ landingPageID: landingId });

		if (!data) {
			return NextResponse.json({ success: false, error: 'Landing not found' }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			data: {
				landingPageID: data.landingPageID,
				ProductId: data.ProductId,
				title: data.title,
				images: data.images,
				createdAt: data.createdAt,
			},
		});
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
	}
}
