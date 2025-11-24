export default function Certificate() {
  return (
    <div className="pt-32 min-h-screen bg-[#16161f] text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto border border-[#2a2a33] p-10 rounded-xl bg-[#2a2a33]">
        {/* Added Images Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <img 
              src="/path-to-your-first-image.jpg" 
              alt="Legal Notice" 
              className="w-full h-48 object-cover rounded-lg border border-gray-600"
            />
          </div>
          <div className="flex-1">
            <img 
              src="/path-to-your-second-image.jpg" 
              alt="General Conditions" 
              className="w-full h-48 object-cover rounded-lg border border-gray-600"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">CERTIFICATE</h1>
        <div className="border-b border-gray-700 mb-8"></div>

        <div className="space-y-8">
          {/* Legal Notice and General Conditions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">LEGAL NOTICE AND GENERAL CONDITIONS OF USE</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Reflect Digital is a marketing and audience portal that enables brand founders and marketers to use artificial intelligence ("AI") based tools for more efficient, effective, and precise marketing and audience targeting.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              PLEASE NOTE: The below terms have been kept here for your attention but are obsolescent since 30.12.2014.
            </p>
          </div>

          <div className="border-b border-gray-700"></div>

          {/* Legal Notice */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Legal Notice</h2>
            <p className="text-gray-400 leading-relaxed">
              This Legal Notice is followed by the Terms and Conditions for Use of Reflect Digital, which regulate its use.
            </p>
          </div>

          <div className="border-b border-gray-700"></div>

          {/* General Conditions of Use */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">General Conditions of Use</h2>
            
            {/* 1. Parties */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">1. Parties</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                1.1. The parties to these General Conditions of Use are Reflect Digital, and you as user, understood as any individual or corporate entity that freely, voluntarily, and without payment accesses Reflect Digital regardless of whether or not you make use of the services offered there.
              </p>
              <p className="text-gray-400 leading-relaxed">
                1.2. The simple fact of visiting Reflect Digital means that you subject yourself without reservations to these General Conditions of Use.
              </p>
            </div>

            {/* 2. Services */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">2. Services</h3>
              <p className="text-gray-400 leading-relaxed">
                Reflect Digital provides the Reflect Digital Portal for the purpose of disseminating its activity and so that Internet users have specific information on the services it offers, related to SMM or the positioning of brands in the market.
              </p>
            </div>

            {/* 3. Obligations of the User */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">3. Obligations of the User</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.1. To make diligent, correct, and legal use of Reflect Digital, respecting current law (particularly that relating to data protection and intellectual and industrial property), morals and decency, public order, and these General Conditions of Use.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.2. To review periodically these General Conditions of Use or any other applicable conditions, checking for changes that may have been made to any of them.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.3. To check the notifications we send to you, as they may include important information.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.4. Not to use Reflect Digital for commercial purposes; for example, by collecting information or content in order to provide other services that may represent obvious competition for Reflect Digital. Not to modify or try to modify Reflect Digital in any way, or to act or use means designed to simulate the appearance or functions of Reflect Digital.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.5. Not to carry out any action that involves the introduction of computer viruses, worms, Trojans, or any other kind of malicious code designed to interrupt, destroy, or limit the functionalities of Reflect Digital.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.6. Not to use reverse engineering techniques and/or decipher, decompile, or use any other system designed to discover the source code of Reflect Digital or of any other element subject to copyright or underlying intellectual property rights.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                3.7. Not to damage, disable, overload, or impede the service (or a network or networks connected to the service), or interfere with its enjoyment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                3.8. In any case, not to carry out any actions that may infringe the rights or interests of Reflect Digital or third parties, such as, for example, intellectual property or industrial rights (patents, brand names, copyright, commercial secrets, etc.).
              </p>
            </div>

            {/* 4. Intellectual and Industrial Property */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">4. Intellectual and Industrial Property</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                4.1. The intellectual property rights to Reflect Digital and to the elements of which it is composed, including the programming, design, brands, graphics, codes, text, or images therein, belong exclusively to Reflect Digital or Reflect Digital Portal has the necessary rights and/or authorizations for their use.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                4.2. The name of the domain, the brands, commercial names, and in general any distinctive mark in Reflect Digital, are also the property of Reflect Digital and/or Reflect Digital Portal has the necessary licenses to use them.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                4.3. As a result of the above, any reproduction, distribution, public communication (including making it available), transformation, or any other form of use, even if the sources are specified, is prohibited without the express agreement in writing from Reflect Digital or the exclusive owner of the rights affected.
              </p>
              <p className="text-gray-400 leading-relaxed">
                4.4. If you detect any infringement of the intellectual and/or industrial property rights in Reflect Digital, please report it as soon as possible by contacting Reflect Digital on WhatsApp or Telegram.
              </p>
            </div>

            {/* 5. Links to Third Sites */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">5. Links to Third Sites</h3>
              <p className="text-gray-400 leading-relaxed">
                Reflect Digital may include links to pages or websites of third parties not related to Reflect Digital. Reflect Digital does not assume any responsibility for these links or the contents that can be accessed through them, as it does not approve or review their functions, advertising, or in general the information included in these pages, and disclaims any liability for their content and their correct operation, or any consequences or damage that may occur as a result of accessing them.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Users who access any of these links do so at their own risk, accepting the external nature of these contents and the inability of Reflect Digital to guarantee that there are no threats, malware, viruses, illegal content, or other links that in turn lead to sites with one or more of said characteristics.
              </p>
            </div>

            {/* 6. Exclusion of Liability */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">6. Exclusion of Liability</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Reflect Digital works to ensure that the services and functionalities of Reflect Digital are always available. However, on access to Reflect Digital it will be shown "as-is," according to the availability and limitations in place at any time. Despite Reflect Digital's continuous efforts to protect the systems and content included in Reflect Digital, for which purpose it uses the common security standards on the Internet, it is not possible to offer full guarantees in relation to intrusions or loss of information that may take place. Similarly, there is no guarantee of the absence of viruses or other harmful elements in Reflect Digital or in third-party websites that may produce software and hardware changes in the user's computer system. The user therefore assumes and understands that there are situations that may be beyond the control of Reflect Digital.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Reflect Digital does not accept any liability that may derive from the misuse of Reflect Digital by the user, or for the breach of obligations or commitments assumed under these General Conditions of Use, or any other conditions that may be applicable. In general, neither Reflect Digital nor its collaborators may be held liable in case of loss of earnings or actual loss for any reason.
              </p>
            </div>

            {/* 7. Indemnity */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">7. Indemnity</h3>
              <p className="text-gray-400 leading-relaxed">
                If Reflect Digital suffers any type of damage, losses, or costs (including lawyers' and court representatives' fees) as a result of a breach by the user of these General Conditions of Use, or any other conditions applicable, the user shall be obliged to compensate Reflect Digital. This will also be the case if as a result of a breach by the user claims are made by third parties against Reflect Digital, in which case the third party shall hold Reflect Digital harmless, and Start.io may claim against the user any expenses, costs, or damages derived from its actions.
              </p>
            </div>

            {/* 8. Data Protection and Security Risks */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-200 mb-3">8. Data Protection and Security Risks</h3>
              <p className="text-gray-400 leading-relaxed">
                The collection of personal data through Reflect Digital and its treatment by Reflect Digital is regulated by a specific Privacy Policy to which the users may have access by clicking here.
              </p>
            </div>

            {/* 9. General Matters */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-3">9. General Matters</h3>
              
              <h4 className="text-lg font-semibold text-gray-300 mb-2">9.1. Safeguard and Interpretation</h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                These General Conditions of Use constitute an agreement between you as user and Reflect Digital. If the competent authority declares any provision to be illegal, invalid, or not enforceable, this provision must be interpreted in the way that is closest to its original intent. Such a declaration with respect to one or more of the clauses shall not affect the validity of the remaining ones. If Reflect Digital does not comply strictly with one of the terms of these Conditions, it does not constitute, nor in any case may it be interpreted to be, a waiver of a possible demand for compliance in the future.
              </p>

              <h4 className="text-lg font-semibold text-gray-300 mb-2">9.2. Legislation and Jurisdiction</h4>
              <p className="text-gray-400 leading-relaxed">
                Relations between Reflect Digital and the user shall be governed by Italian law, and in case of disagreement with respect to the interpretation of or compliance with these General Conditions of Use, they expressly renounce any other jurisdiction that may correspond to them, and subject themselves to the courts of Barcelona, unless any other jurisdiction is determined by imperative law.
              </p>
            </div>
          </div>

          <div className="pt-8 text-gray-500">
            <p>Date of last update: This agreement was last updated on October 10, 2018.</p>
          </div>
        </div>
      </div>
    </div>
  );
}