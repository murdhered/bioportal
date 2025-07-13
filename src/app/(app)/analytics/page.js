import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import {Event} from "@/models/Event";
import {Page} from "@/models/Page";
import {
  faLink,
  faEye,
  faMousePointer
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import { isToday } from "date-fns";


function StatCard({ icon, value, title }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border flex items-center gap-4">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        <FontAwesomeIcon icon={icon} className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  );
}


export default async function AnalyticsPage() {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }

  const page = await Page.findOne({owner: session.user.email});
  if (!page) {
    return redirect('/account');
  }

  const groupedViews = await Event.aggregate([
    { $match: { type: 'view', uri: page.uri } },
    { $group: {
        _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } },
        count: { "$count": {} }
      }
    },
    { $sort: {_id: 1} }
  ]);

  const clicks = await Event.find({ page: page.uri, type: 'click' });

  const totalViews = groupedViews.reduce((sum, view) => sum + view.count, 0);
  const totalClicks = clicks.length;

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-8">
      
      <div className="grid md:grid-cols-2 gap-6">
        <StatCard icon={faEye} title="Total Page Views" value={totalViews} />
        <StatCard icon={faMousePointer} title="Total Link Clicks" value={totalClicks} />
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Page Views Over Time</h2>
        {groupedViews.length > 0 ? (
          <Chart data={groupedViews.map(o => ({
            'date': o._id,
            'views': o.count,
          }))} />
        ) : (
          <p className="text-center text-gray-500 py-8">No page views recorded yet.</p>
        )}
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Link Clicks</h2>
        {page.links.length > 0 ? (
          <div className="space-y-4">
            {page.links.map(link => {
              const clicksToday = clicks.filter(c => c.uri === link.url && isToday(c.createdAt)).length;
              const clicksTotal = clicks.filter(c => c.uri === link.url).length;

              return (
                <div key={link.title} className="flex flex-col md:flex-row gap-4 items-center border-t border-gray-100 py-4">
                  <div className="grow">
                    <h3 className="font-bold text-lg">{link.title || 'No Title'}</h3>
                    <p className="text-gray-500 text-sm break-all">{link.subtitle || link.url}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center border rounded-lg p-2 min-w-[120px]">
                      <div className="text-3xl font-semibold text-indigo-600">{clicksToday}</div>
                      <div className="text-gray-400 text-xs uppercase font-bold">Clicks Today</div>
                    </div>
                    <div className="text-center border rounded-lg p-2 min-w-[120px]">
                      <div className="text-3xl font-semibold">{clicksTotal}</div>
                      <div className="text-gray-400 text-xs uppercase font-bold">Clicks Total</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (

          <p className="text-center text-gray-500 py-8">You haven&apos;t added any links yet.</p>
        )}
      </div>

    </div>
  );
}