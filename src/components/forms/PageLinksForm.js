'use client';
import {savePageLinks} from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import {upload} from "@/libs/upload";
import {faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {useState} from "react";
import toast from "react-hot-toast";
import {ReactSortable} from "react-sortablejs";

export default function PageLinksForm({page,user}) {
  const [links,setLinks] = useState(page.links || []);

  async function save() {
    const hasEmptyLink = links.some(l => l.title.trim() === '' || l.url.trim() === '');
    
    if (hasEmptyLink) {
      toast.error('Please fill in a title and URL for all links before saving.');
      return;
    }
    
    await savePageLinks(links);
    toast.success('Saved!');
  }

  function addNewLink() {
    setLinks(prev => {
      return [...prev, {
        key: Date.now().toString(),
        title:'',
        subtitle:'',
        icon:'',
        url:'',
      }];
    });
  }

  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, uploadedImageUrl => {
      setLinks(prevLinks => {
        const newLinks = [...prevLinks];
        const linkIndex = newLinks.findIndex(l => l.key === linkKeyForUpload);
        if (linkIndex !== -1) {
            newLinks[linkIndex].icon = uploadedImageUrl;
        }
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks(prev => {
      const newLinks = [...prev];
      const linkToChange = newLinks.find(l => l.key === keyOfLinkToChange);
      if (linkToChange) {
        linkToChange[prop] = ev.target.value;
      }
      return newLinks;
    })
  }

  function removeLink(linkKeyToRemove) {
    setLinks(prevLinks =>
      [...prevLinks].filter(l => l.key !== linkKeyToRemove)
    );
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-2">Links</h2>
        <p className="text-gray-500 mb-6">Add, reorder, and manage your links.</p>
        
        <button
          onClick={addNewLink}
          type="button"
          className="text-indigo-600 font-semibold flex gap-2 items-center cursor-pointer bg-indigo-100 p-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors">
          <FontAwesomeIcon className="w-4 h-4" icon={faPlus} />
          <span>Add new link</span>
        </button>
        
        <div className="mt-4">
          <ReactSortable
            handle={'.handle'}
            list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-4 p-4 border rounded-xl bg-white shadow-sm md:flex gap-4 items-start">
                <div className="handle flex-shrink-0 flex items-center justify-center h-full">
                  <FontAwesomeIcon
                    className="text-gray-400 mr-2 cursor-grab"
                    icon={faGripLines} />
                </div>
                
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="bg-gray-100 relative aspect-square overflow-hidden w-20 h-20 rounded-lg flex justify-center items-center">
                    {l.icon && (
                      <Image className="w-full h-full object-cover" src={l.icon} alt={'icon'} width={64} height={64} />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="2x" icon={faLink} className="text-gray-400"/>
                    )}
                  </div>
                  <label htmlFor={'icon'+l.key} className="text-sm border py-1 px-2 flex items-center gap-1 text-gray-600 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors">
                    <input onChange={ev => handleUpload(ev,l.key)} id={'icon'+l.key} type="file" className="hidden"/>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span>Icon</span>
                  </label>
                </div>
                
                <div className="grow space-y-2">
                    <div>
                        <label className="input-label">Title</label>
                        <input value={l.title} onChange={ev => handleLinkChange(l.key, 'title', ev)} type="text" placeholder="Title"/>
                    </div>
                    <div>
                        <label className="input-label">Subtitle</label>
                        <input value={l.subtitle} onChange={ev => handleLinkChange(l.key, 'subtitle', ev)} type="text" placeholder="Subtitle (optional)"/>
                    </div>
                    <div>
                        <label className="input-label">URL</label>
                        <input value={l.url} onChange={ev => handleLinkChange(l.key, 'url', ev)} type="text" placeholder="https://example.com/"/>
                    </div>
                </div>

                <div className="flex-shrink-0 mt-4 md:mt-0">
                    <button onClick={() => removeLink(l.key)} type="button" className="w-full md:w-auto bg-gray-200 py-2 px-4 rounded-lg h-full flex gap-2 items-center hover:bg-red-500 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        <div className="border-t pt-6 mt-8 flex justify-center">
          <SubmitButton className="max-w-xs">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
