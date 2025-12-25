import{r as F,j as n,B as j,a5 as d}from"./index-Bm67KBkU.js";import{D as U,a as R,b as B,c as v}from"./dropdown-menu-B9zQ9u84.js";import{b as E}from"./chevron-right-CbIMR3DA.js";import{e as w}from"./SalesMotionHero-sGphstF2.js";import{F as q}from"./file-text-DChZNHsM.js";const V=({tableRef:x,tableName:b="Table",className:L="",size:T="sm",showDropdown:D=!0,onCopyAllTabs:C,contextInfo:l})=>{const[$,f]=F.useState(!1),A=async()=>{if(!x.current){d({title:"Error",description:"Table not found",variant:"destructive"});return}try{const i=document.createElement("div");i.style.position="absolute",i.style.left="-9999px",i.style.top="-9999px",document.body.appendChild(i);const p=x.current.cloneNode(!0),o=p.querySelector("tbody");o&&Array.from(o.querySelectorAll("tr")).forEach(s=>{const r=s.classList.contains("bg-slate-100")||s.querySelector('button[class*="ChevronRight"], button[class*="ChevronDown"]')!==null||s.querySelector("svg.lucide-chevron-right, svg.lucide-chevron-down")!==null,c=s.classList.contains("bg-slate-800")||s.textContent?.includes("TOTALS")||s.textContent?.includes("Total");r&&!c&&s.remove()});const u=document.createElement("style");u.textContent=`
        /* Table Container */
        .table-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        /* Table Styling */
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          font-size: 14px;
        }

        /* Header Styling */
        thead tr {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 2px solid #e2e8f0;
        }

        th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-right: 1px solid #e5e7eb;
          position: relative;
        }

        th:last-child {
          border-right: none;
        }

        /* Body Styling */
        tbody tr {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }

        tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }

        tbody tr:hover {
          background-color: #f3f4f6;
        }

        td {
          padding: 12px 16px;
          color: #374151;
          border-right: 1px solid #f3f4f6;
        }

        td:last-child {
          border-right: none;
        }

        /* Number formatting */
        .number-cell {
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }

        /* Currency formatting */
        .currency-cell {
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          color: #059669;
        }

        /* Percentage formatting */
        .percentage-cell {
          text-align: right;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }

        /* Status badges */
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-inactive {
          background-color: #fef3c7;
          color: #92400e;
        }

        /* Metric highlights */
        .metric-positive {
          color: #059669;
          font-weight: 600;
        }

        .metric-negative {
          color: #dc2626;
          font-weight: 600;
        }

        .metric-neutral {
          color: #6b7280;
          font-weight: 500;
        }

        /* Card wrapper for better presentation */
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          margin: 16px 0;
        }

        .table-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .table-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }
      `;const h=document.createElement("div");h.className="table-card";const m=document.createElement("div");m.className="table-header",m.innerHTML=`
        <h3 class="table-title">${b}</h3>
        <p class="table-subtitle">Exported on ${new Date().toLocaleDateString()}</p>
      `,h.appendChild(m),h.appendChild(u),h.appendChild(p),i.appendChild(h);try{p.querySelectorAll("td, th").forEach(s=>{try{const r=s.textContent?.trim()||"";r.match(/^\$[\d,]+\.?\d*$/)||r.match(/^₹[\d,]+\.?\d*$/)?s.classList.add("currency-cell"):r.match(/^\d+\.?\d*%$/)?s.classList.add("percentage-cell"):r.match(/^[\d,]+\.?\d*$/)&&s.classList.add("number-cell"),r.toLowerCase().includes("active")||r.toLowerCase().includes("converted")?s.innerHTML=`<span class="status-badge status-active">${r}</span>`:(r.toLowerCase().includes("inactive")||r.toLowerCase().includes("pending"))&&(s.innerHTML=`<span class="status-badge status-inactive">${r}</span>`),r.includes("+")||r.includes("%")&&parseFloat(r)>0?s.classList.add("metric-positive"):(r.includes("-")||r.includes("%")&&parseFloat(r)<0)&&s.classList.add("metric-negative")}catch{}})}catch{}const t=h.outerHTML;if(navigator.clipboard&&navigator.clipboard.write)try{const a=new Blob([t],{type:"text/html"}),s=new ClipboardItem({"text/html":a});await navigator.clipboard.write([s])}catch{const s=p.textContent||"";await navigator.clipboard.writeText(s)}else{const a=document.createElement("textarea");a.value=t,i.appendChild(a),a.select(),document.execCommand("copy"),i.removeChild(a)}document.body.removeChild(i),f(!0),setTimeout(()=>f(!1),2e3),d({title:"Copied to Clipboard",description:`${b} has been copied with styling`})}catch(i){d({title:"Copy Failed",description:`Unable to copy table to clipboard: ${i instanceof Error?i.message:"Unknown error"}`,variant:"destructive"})}},k=async()=>{if(!x.current){d({title:"Error",description:"Table not found",variant:"destructive"});return}try{const i=x.current,p=i.querySelector("table")||i;let o=`${b}
`;if(o+=`Exported on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
`,l){if(o+=`
--- Export Context ---
`,l.selectedMetric&&(o+=`Metric: ${l.selectedMetric}
`),l.location)o+=`Location: ${l.location}
`;else if(l.filters?.location){const t=Array.isArray(l.filters.location)?l.filters.location.join(", "):l.filters.location;t&&t!=="all"?o+=`Location: ${t}
`:o+=`Location: All Locations
`}else o+=`Location: All Locations
`;if(l.dateRange){const{start:t,end:a}=l.dateRange;t&&a&&(o+=`Date Range: ${t} to ${a}
`)}if(l.filters){const t=[];Object.entries(l.filters).forEach(([a,s])=>{if(s&&Array.isArray(s)&&s.length>0)t.push(`${a.charAt(0).toUpperCase()+a.slice(1)}: ${s.join(", ")}`);else if(s&&typeof s=="string"&&s!=="All"&&s!=="")t.push(`${a.charAt(0).toUpperCase()+a.slice(1)}: ${s}`);else if(typeof s=="object"&&s!==null&&!Array.isArray(s)){const r=Object.entries(s).filter(([c,e])=>e&&e!=="").map(([c,e])=>`${c}: ${e}`).join(", ");r&&t.push(`${a.charAt(0).toUpperCase()+a.slice(1)}: ${r}`)}}),t.length>0?o+=`Active Filters: ${t.join("; ")}
`:o+=`Active Filters: None
`}l.additionalInfo&&Object.entries(l.additionalInfo).forEach(([t,a])=>{a&&(o+=`${t.charAt(0).toUpperCase()+t.slice(1)}: ${a}
`)}),o+=`
--- Table Data (Headers + Data Rows + Totals) ---
`,o+=`Note: Grouped/Category rows have been excluded
`}else o+=`
`;const u=[];p.querySelectorAll("thead th, thead td, tr:first-child th, tr:first-child td").forEach(t=>{const a=t.textContent?.trim()||"";a&&u.push(a)}),u.length>0&&(o+=u.join("	")+`
`,o+=u.map(()=>"---").join("	")+`
`);const m=p.querySelectorAll("tbody tr, tr:not(:first-child)");if(m.forEach(t=>{const a=t.classList.contains("bg-slate-100")||t.classList.contains("bg-gray-100")||t.classList.contains("bg-slate-50")||t.classList.contains("bg-gray-50")||t.classList.contains("group-row")||t.classList.contains("category-row")||t.classList.contains("section-header")||t.classList.contains("group-header")||t.classList.contains("category-header")||t.querySelector('button[class*="ChevronRight"], button[class*="ChevronDown"]')!==null||t.querySelector("svg.lucide-chevron-right, svg.lucide-chevron-down")!==null||t.querySelector('[data-lucide="chevron-right"], [data-lucide="chevron-down"]')!==null||t.querySelector(".fa-chevron-right, .fa-chevron-down")!==null||t.hasAttribute("data-group")||t.hasAttribute("data-category")||t.hasAttribute("data-section")||t.hasAttribute("data-grouped")||(()=>{const e=t.querySelector("td:first-child, th:first-child");return e&&e.getAttribute("colspan")&&parseInt(e.getAttribute("colspan")||"1")>1})()||(()=>{const e=t.textContent?.trim().toLowerCase()||"";return e.includes("expand")||e.includes("collapse")||e.includes("show more")||e.includes("show less")||e.includes("items")&&!e.match(/\d+\s+items/)||e.includes("category:")||e.includes("group:")||e.includes("section:")||e.length>0&&e.length<50&&!e.match(/\d/)&&!e.includes("₹")&&!e.includes("%")&&!e.includes(":")&&t.querySelectorAll("td, th").length<=2})(),s=t.classList.contains("bg-slate-800")||t.classList.contains("bg-gray-800")||t.classList.contains("bg-slate-900")||t.classList.contains("totals-row")||t.classList.contains("summary-row")||t.classList.contains("footer-row")||(()=>{const e=t.textContent?.trim()||"";return e.includes("TOTALS")||e.includes("TOTAL")||e.includes("Total")||e.includes("Sum")||e.includes("Summary")||e.includes("Grand Total")||e.includes("Subtotal")||(()=>{const g=t.querySelector("td:first-child, th:first-child")?.textContent?.trim().toLowerCase()||"";return g==="total"||g==="totals"||g==="grand total"||g==="summary"||g.startsWith("total ")})()})();if(a&&!s)return;const r=t.querySelectorAll("td, th"),c=[];r.forEach(e=>{if(e.querySelector("button")&&!e.textContent?.trim().replace(/[\s\n\r]+/g,"").length)c.push("");else{const g=e.textContent?.trim()||"";c.push(g)}}),c.length>0&&c.some(e=>e!=="")&&(o+=c.join("	")+`
`)}),u.length===0&&m.length===0&&(o+=p.textContent?.trim()||"No data available"),navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(o);else{const t=document.createElement("textarea");t.value=o,t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}f(!0),setTimeout(()=>f(!1),2e3),d({title:"Copied to Clipboard",description:`${b} has been copied as text`})}catch(i){d({title:"Copy Failed",description:`Unable to copy table to clipboard: ${i instanceof Error?i.message:"Unknown error"}`,variant:"destructive"})}},M=async()=>{if(!C){d({title:"Error",description:"Copy all tabs function not provided",variant:"destructive"});return}try{const i=await C();await navigator.clipboard.writeText(i),f(!0),setTimeout(()=>f(!1),2e3),d({title:"Copied All Tabs",description:"All metric tables have been copied to clipboard"})}catch(i){d({title:"Copy Failed",description:`Unable to copy all tabs: ${i instanceof Error?i.message:"Unknown error"}`,variant:"destructive"})}},S={sm:"h-8 w-8",md:"h-10 w-10",lg:"h-12 w-12"}[T],y={sm:"h-4 w-4",md:"h-5 w-5",lg:"h-6 w-6"}[T];return D?n.jsxs(U,{children:[n.jsx(R,{asChild:!0,children:n.jsx(j,{variant:"outline",size:"icon",className:`${S} bg-white/90 hover:bg-gray-50 border-gray-200 shadow-sm transition-all duration-200 ${L}`,title:`Copy ${b} to clipboard`,children:$?n.jsx(E,{className:`${y} text-green-600`}):n.jsx(w,{className:`${y} text-gray-600`})})}),n.jsxs(B,{align:"end",className:"w-48",children:[n.jsxs(v,{onClick:A,className:"flex items-center gap-2",children:[n.jsx(w,{className:"h-4 w-4"}),n.jsx("span",{children:"Copy with styling"})]}),n.jsxs(v,{onClick:k,className:"flex items-center gap-2",children:[n.jsx(q,{className:"h-4 w-4"}),n.jsx("span",{children:"Copy as text"})]}),C&&n.jsxs(v,{onClick:M,className:"flex items-center gap-2",children:[n.jsx(q,{className:"h-4 w-4"}),n.jsx("span",{children:"Copy all tabs"})]})]})]}):n.jsx(j,{variant:"outline",size:"icon",onClick:A,className:`${S} bg-white/90 hover:bg-gray-50 border-gray-200 shadow-sm transition-all duration-200 ${L}`,title:`Copy ${b} with styling to clipboard`,children:$?n.jsx(E,{className:`${y} text-green-600`}):n.jsx(w,{className:`${y} text-gray-600`})})};export{V as C};
//# sourceMappingURL=CopyTableButton-Blm2CDq4.js.map
